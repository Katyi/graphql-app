import {gql} from '@apollo/client'

export const GET_ALL_AUTHORS = /* GraphQL */ gql`
  {
    Authors {
      id
      name
      books {
        id
        title
      }
    }
  }
`;

export const GET_ALL_BOOKS = /* GraphQL */ gql`
  {
    Books {
      id
      title
      authorId
    }
  }
`;