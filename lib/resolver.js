
const connectDB = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
    Query: {
        getCourses: async () => {
            let db, courses = [];
            try{
                db = await connectDB();
                courses = await db.collection('courses').find().toArray();
            }catch(err){
                console.log(err);
            }
            return courses;
        },
        getCourse: async (root, {id}) =>{
            let db, course;

            try {
                db = await connectDB();
                course = await db.collection('courses').findOne({ _id: ObjectID(id) })
            } catch (error) {
                console.error(error)
            }

            return course;
        }
    }
}