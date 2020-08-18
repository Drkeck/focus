const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type query {
        user: User
    }
`;

module.export = typeDefs;