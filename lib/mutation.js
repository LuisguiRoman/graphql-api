const connectDB = require('./db');
const { ObjectID } = require('mongodb');

const errorHandler = require('./errorHandler');

module.exports = {
    createCourse: async (root, {input})=>{
        //Campos vacions por defecto en caso de que no esten enla peticin
        const defaults = {
            teacher: '',
            topic: ''
        }
        const newCourse = Object.assign(defaults, input);

        let db, course;
        try{
            db = await connectDB();
            await db.collection('courses').insertOne(newCourse);
            newCourse._id = course.insertedId;
        }catch (err){
            errorHandler(err);
        }

        return newCourse;
    },
    editCourse: async (root, {_id, input})=>{
        let db, course;
        try{
            db = await connectDB();
            await db.collection('courses').updateOne(
                {_id: ObjectID(_id)},
                {$set: input}
            );
            course = await db.collection('courses').findOne(
                {_id: ObjectID(_id)}
            );
        }catch (err){
            errorHandler(err);
        }

        return course;
    },
    createStudent: async (root, {input})=>{
        let db, student;
        try{
            db = await connectDB();
            await db.collection('students').insertOne(input);
            input._id = student.insertedId;
        }catch (err){
            errorHandler(err);
        }

        return input;
    },
    editStudent: async (root, {_id, input})=>{
        let db, student;
        try{
            db = await connectDB();
            await db.collection('students').updateOne(
                {_id: ObjectID(_id)},
                {$set: input}
            );
            student = await db.collection('students').findOne(
                {_id: ObjectID(_id)}
            );
        }catch (err){
            errorHandler(err);
        }

        return student;
    },
    addPeople: async (root, {courseID, personID}) =>{
        let db, person, course;
        try{
            db = await connectDB();
            course = await db.collection('courses').findOne(
                {_id: ObjectID(courseID)}
            );
            person = await db.collection('students').findOne(
                {_id: ObjectID(personID)}
            );

            if(!course || !person) throw new Error('Persona o curso incorrecto');

            await db.collection('courses').updateOne(
                {_id: ObjectID(courseID)},
                {$addToSet: {people: ObjectID(personID)}}
            );

        }catch (err){
            errorHandler(err);
        }

        return course;
    }
}