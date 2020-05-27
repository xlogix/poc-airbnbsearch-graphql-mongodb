import { UserMutation, UserQueries, UserSubscription } from './user';
import { ListingMutation, ListingQueries, ListingSubscription } from './listings';


const rootResolver = {
    Query: {
        ...UserQueries,
        ...ListingQueries
    },
    Mutation: {
        ...UserMutation,
        ...ListingMutation
    },
    Subscription: {
        ...UserSubscription,
        ...ListingSubscription
    }
};

export default rootResolver;
