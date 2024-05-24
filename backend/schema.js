import { gql } from 'apollo-server-express'
import { createAuthor, createBook, deleteAuthor, deleteBook, 
          getAuthor, getAuthorBooks, getAuthors, getBook, getBookAuthor, getBooks, updateAuthor, updateBook } from './models'

export const typeDefs = /* GraphQL */ gql`
  type Query {
    Authors: [Author]
    Author(id: ID!): Author
    Books: [Book]
    Book(id: ID!): Book
  }

  type Author {
    id: ID!
    name: String
  }

  type Book {
    id: ID!
    title: String
    authorId: ID!
  }

  extend type Author {
    books: [Book]
  }

  extend type Book {
    author: Author
  }

  input CreateAuthorInput {
    id: ID
    name: String
  }

  input CreateBookInput {
    id: ID
    title: String
    authorId: ID
  }
  
  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author
    createBook(input: CreateBookInput!): Book!
    updateAuthor(id: ID!, input: CreateAuthorInput!): Author
    updateBook(id: ID!, input: CreateBookInput!): Book
    deleteAuthor(id: ID!): Author
    deleteBook(id: ID!): Book
    deleteAuthorBooks(authorId: ID): Book
  }
`;

export const resolvers = {
  Query: {
    Authors() {
      return getAuthors()
    },
    Books() {
      return getBooks();
    },
    Author(_, { id }) {
      return getAuthor(id);
    },
    Book(_, { id }) {
      return getBook(id);
    },
  },
  Author: {
    books(author) {
      return getAuthorBooks(author.id);
    },
  },
  Book: {
    author(book) {
      return getBookAuthor(book.authorId);
    },
  },
  Mutation: {
    createAuthor(_, args) {
      return createAuthor(args.input);
    },
    createBook(_, args) {
      return createBook(args.input);
    },
    updateAuthor(_, args) {
      return updateAuthor(args.id, args.input)
    },
    updateBook(_, args) {
      return updateBook(args.id, args.input)
    },
    deleteAuthor(_, args) {
      return deleteAuthor(args.id)
    },
    deleteBook(_, args) {
      return deleteBook(args.id)
    }
  }
};

