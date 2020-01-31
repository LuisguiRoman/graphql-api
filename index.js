const { graphql, buildSchema } = require('graphql');
const express = require('express');
const gplMiddleware = require('express-graphql');
const  { readFileSync } = require('fs');
const { join } = require('path');

const app = express();
const port = process.env.port || 3000;


// schema
const schema = buildSchema(
    readFileSync(
        join(__dirname, 'lib', 'schema.graphql'),
        'utf-8'
    )
);

// resolvers
const resolvers = {
    hello: () => 'Hola mundo'
};

//middleware para usar graphoql en la api
app.use(`/api`, gplMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

app.listen(port, ()=>{
    console.log('Servidor iniciando')
});