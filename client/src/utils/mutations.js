import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser ($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password){
      token
      user{
        _id
        username
        email
      }
    }
  }
`;

export const ADD_FRIEND = gql`
mutation addFriend($userId: ID!) {
    addFriend(userId: $userId) {
      username
      _id
      friends {
        username
        _id
      }
    }
  }
`;