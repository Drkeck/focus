// page for queries
import gql from 'graphql-tag';

export const ME = gql`
    query Me {
        Me {
            _id
            username
            email
            friends {
                username
                _id
            }
        }
    }
`;

export const USERS = gql`
    query users {
        users {
            username
            _id
        }
    }
`;