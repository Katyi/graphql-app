import { gql } from 'apollo-server-express'
import { createUser, getAllUsers, getUserFriends } from './models'

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    age: Int
    email: String
    friends: [User]
  }

  type Query {
    users: [User]
  }

  input CreateUserInput {
    id: Int
    name: String
    age: Int
    email: String
    friends: [Int]
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }
`
export const resolvers = {
  Query: {
    users() {
      return getAllUsers()
    }
  },
  User: {
    friends(user) {
      if (!user.friends || !user.friends.length) {
        return
      }
      
      return Promise.all(
        user.friends.map(({ id }) => getUserFriends(id))
      )
    },
  },
  Mutation: {
    createUser(_, args) {
      return createUser(args.input)
    }
  },
}