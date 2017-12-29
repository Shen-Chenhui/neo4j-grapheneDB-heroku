const { driver, session } = require('../neo4j');


var resolvers = {
  Query: {
    hello() {
      return 'world';
    },
    author() {
       return {
         id: 1,
         firstName: "Chenhui",
         lastName: "Shen",
       }
    },
    people() {
      return session
        .run('MATCH (P) RETURN P')
        .then(function (result) {
          var arr = [];
          result.records.forEach(function (record) {
            arr.push(record.get('P').properties)
          });
          return arr
          session.close();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  Author: {
    posts(author) {
      return [{
        id:1,
        title: "test",
        text:"hello world",
        views:20
      }]
    }
  },

};

module.exports = resolvers;
