import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
    type Query {
        users: [User!]!
        user(userId: ID!): User!
        login(email: String!, password: String!): AuthData!
    }
    type Mutation {
        createUser(userInput: UserInput): AuthData!
        updateUser(userId: ID!, updateUser: UpdateUser): User!
    }
    type Subscription {
        userAdded: User
    }
    type User {
        _id: ID!
        email: String!
        name: String!
        password: String
        createdAt: String!
        updatedAt: String!
    }
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }
    input UserInput {
        email: String!
        name: String!
        password: String!
    }
    input UpdateUser {
        email: String
        name: String
        password: String
    }
`;

export { userTypeDefs };
