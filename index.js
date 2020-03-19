require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express');
const gqlMiddleware = require('express-graphql');
const  { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./lib/resolver');

const app = express();
const port = process.env.port || 3000;


// schema
const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
);
const schema = makeExecutableSchema({typeDefs, resolvers});

//middleware para usar graphoql en la api
app.use('/api', gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))


app.listen(port, ()=>{
    console.log('Servidor iniciando')
});