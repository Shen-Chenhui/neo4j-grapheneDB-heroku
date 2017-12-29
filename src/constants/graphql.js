const gql = require('graphql-tag');

export const GET_PEOPLE_QUERY = gql`
  query getPeopleQuery {
    people {
      name
      age
    }
  }
  `
