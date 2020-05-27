import { gql } from 'apollo-server-express';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import resolvers from '../resolvers/index';

const typeDefs = gql`
    input CreateListingInput {
        name: String!
        category: String!
        url: String!
        description: String!
        price_rate: Int!
        room_type: String!
        room_and_property_type: String!
        latitude: Number!
        longitude: Number!
        person_capacity: Number!
        amenities: [String!]!
    }

    input SearchListingsInput {
        name: String
        room_type: String
        room_and_property_type: String
        price_rate: Int
        amenities: [String]
    }
        
    type Query {
        searchListings(
            input: SearchListingsInput
            offset: Int!
            limit: Int!
        ): [Listing!]!
    }
      
    type Mutation {
        createListing(input: CreateListingInput!): Boolean!
    }

    type Mutation {
        deleteListing(id: String!): Boolean!
    }
`;

const schema: ApolloServerExpressConfig = {
    typeDefs,
    resolvers,
    introspection: true,
    context: async ({ req, connection, payload }: any) => {
        if (connection) {
            return { isAuth: payload.authToken };
        }
        return { isAuth: req.isAuth };
    },
    playground: true
};

export default schema;
