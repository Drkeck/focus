const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        friends: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        Me: User
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        addFriend(userId: ID!): User
        removeFriend(userId: ID!): User
    }
`;

module.exports = typeDefs;