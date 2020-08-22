const { gql } = require('apollo-server-express');
const typeDefs = gql`
type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Subject {
    _id: ID
    subject: String
  }
  type Offering {
    name: String
    description: String
    _id: ID
    quantity: Int
    price: Float
    subject: Subject
    user: User
  }
  type Order {
    _id: ID
    purchaseDate: String
    offerings: [Offering]
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    # role: String
    tutor: String
    bio: String
    image: String
    location: String
    # timezone: String
    orders: [Order]
    feedback: [Feedback]
  }
  type Feedback {
    _id: ID
    feedback: String,
    createdAt: String,
    user: String
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    me: User
    users: [User]
    user(email: String!): User
    subjects: [Subject]
    offeringBySubject(subject: ID): [Offering]
    #offerings(subject: ID, subject: String): [Offering]
    offerings: [Offering] 
    searchOffering(name: String): [Offering]
    offering(_id: ID!): Offering
    # offeringbyUserID(userid: String!): Offering 
    feedback: Feedback
    order(_id: ID!): Order  
    orders: Order  
    checkout(offerings: [ID]!): Checkout
  }
  type Mutation {
    singleUpload(file: Upload!): File!,
    singleUploadStream(file: Upload!): File!
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, location: String, tutor: String, bio: String): Auth
    addSubject(subject: String!): Subject
    removeSubject(subject: String!): Subject 
    addOrder(offerings: [ID]!): Order
    updateUser(input: userDetails): User
    addOffering(name: String, description: String, quantity: Int,price: Float, user: String, subject: String): Offering
    updateOffering(_id: ID!, input: updateOffering!): Offering
    login(email: String!, password: String!): Auth
  }
  input updateOffering {
    quantity: Int
    price: Float
    #user: String
    #subject: subjectDetails
  }
  input orderDetails {
    purchaseDate: String
    offerings: [updateOffering]
  }
  input feedbackDetails {
    feedback: String,
    createdAt: String,
    user: String
  }
  input userDetails {
    firstName: String
    lastName: String
    email: String
    password: String
    # role: String
    tutor: String
    bio: String
    image: String
    location: String
    # timezone: String
    subject: String
    orders: [orderDetails]
    feedback: [feedbackDetails]
  }
  input subjectDetails {
    subject: String
    # _id: ID
  }
  # input OfferingDetails {
  #   quantity: Int
  #   price: Float
  #   user: String
  #   subject: subject
  # }
  type Checkout {
    session: ID
  }
`; 
module.exports = typeDefs;