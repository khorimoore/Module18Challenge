import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Book {
    _id: ID!
    title: String!
    author: String!
    description: String
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
  }

  type Query {
    me: User
    getBooks: [Book]
  }

  input BookInput {
    title: String!
    author: String!
    description: String
    image: String
    link: String
  }

  type Mutation {
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;