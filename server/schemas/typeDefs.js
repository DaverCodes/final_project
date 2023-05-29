const { gql } = require('apollo-server-express');

// const typeDefs = gql`
//   type A {
//     _id: ID!
//     name: String!
//   }

//   type Matchup {
//     _id: ID!
//     A1: String!
//     A2: String!
//     A1_votes: Int
//     A2_votes: Int
//   }

//   type Query {
//     A: [A]
//     matchups(_id: String): [Matchup]
//   }

//   type Mutation {
//     createMatchup(A1: String!, A2: String!): Matchup
//     createVote(_id: String!, ANum: Int!): Matchup
//   }
// `;

module.exports = typeDefs;
