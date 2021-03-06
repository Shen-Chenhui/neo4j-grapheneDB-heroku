const express = require ('express');
const app = express();
const neo4j = require('neo4j-driver');
const bodyParser = require('body-parser')
const { driver, session } = require('./neo4j');
// const graphqlHTTP = require('express-graphql');
const typeDefs = require('./data/schema');
const resolvers = require('./data/resolvers')
var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { makeExecutableSchema } = require('graphql-tools');



//enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var schema = makeExecutableSchema({typeDefs, resolvers});
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.get('/get-all',(req,res) => {
  session
    .run('MATCH (P) RETURN P')
    .then(function (result) {
      var arr = [];
      result.records.forEach(function (record) {
        arr.push(record.get('P').properties)
        console.log(record.get('P').properties)
      });
      res.send(arr)
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
})

app.get('/create',(req,res) => {
  session
    .run('CREATE (P:Person {name:{name},age:{age}}) RETURN P',{
      name: req.param('name'),
      age:req.param('age')
    })
    .then(function (result) {
      var arr = [];
      result.records.forEach(function (record) {
        arr.push(record.get('P').properties)
      });
      res.send(arr)
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
})

const port = process.env.PORT || 4000;
app.listen(port, function(){
  console.log("listening on port: ",port);
})
