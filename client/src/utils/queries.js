import gql from 'graphql-tag';

export const ME = gql`
    Query Me {
        User {
            username
            email
        }
    }
`;

export const User = gql`
    Query user {
        User {
            username
        }
    }
`;