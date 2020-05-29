import { gql } from 'apollo-server-express';

const listingTypeDefs = gql`
    type Query {
        listings: [Listing!]!
        listing(listingId: ID!): Listing!
        searchListings(
            input: SearchListingsInput
        ): [Listing!]!
    }
    type Mutation {
        createListing(input: ListingInput!): Boolean!
        updateListing(listingId: String!, input: UpdateListingInput!): Boolean!
        deleteListing(id: String!): Boolean!
    }
    type Subscription {
        listingAdded: Listing
    }
    type Listing {
        _id: ID!
        name: String!
        category: String!
        url: String!
        description: String!
        price_rate: Int!
        room_type: String
        room_and_property_type: String!
        latitude: Float!
        longitude: Float!
        person_capacity: Int!
        amenities: [String!]!
    }
    input ListingInput {
        name: String!
        category: String!
        url: String!
        description: String!
        price_rate: Int!
        room_type: String!
        room_and_property_type: String!
        latitude: Float!
        longitude: Float!
        person_capacity: Int!
        amenities: String!
    }
    input UpdateListingInput {
        name: String!
        category: String!
        url: String!
        description: String!
        price_rate: Int!
        room_type: String!
        room_and_property_type: String!
        latitude: Float!
        longitude: Float!
        person_capacity: Int!
        amenities: [String!]!
    }
    input SearchListingsInput {
        name: String
        room_and_property_type: String
        price_rate: Int
        person_capacity: Int
        amenities: String
    }
`;

export { listingTypeDefs };
