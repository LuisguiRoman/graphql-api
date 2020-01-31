
const courses = [
    {
        _id: '1',
        title: 'Mi titulo',
        teacher: 'Mi profesor',
        description: 'Una descripcion',
        topic: 'programacion'
    },
    {
        _id: '2',
        title: 'Mi titulo 2',
        teacher: 'Mi profesor',
        description: 'Una descripcion',
        topic: 'programacion'
    },
    {
        _id: '3',
        title: 'Mi titulo 3',
        teacher: 'Mi profesor',
        description: 'Una descripcion',
        topic: 'programacion'
    }
];

module.exports = {
    Query: {
        getCourses: () => courses,
        getCourse: (root, args) =>{
            //Me filtra el array de cursos por id
            const course = courses.filter(course => course._id === args.id);
            //Retornar el primer elemento del arreglo
            return course.pop();
        }
    }
}