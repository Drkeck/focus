// page for queries
import gql from 'graphql-tag';

// queries for logged in users
export const GET_ME = gql`
  {
  query  me {
      _id
      username
      email
      }
    }
`;
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