import gql from 'graphql-tag';

export const ME = gql`
    query Me {
        Me {
            _id
            username
            email
        }
    }
`;

export const User = gql`
    query user {
        user {
            username
        }
    }
`;