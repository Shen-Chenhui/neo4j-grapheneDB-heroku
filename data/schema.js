var typeDefs = [`
type Query {
  hello: String,
  author: Author
  people: [Person]
}

type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Person {
  name: String
  age: String
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
}

schema {
  query: Query
}`];
module.exports = typeDefs;
