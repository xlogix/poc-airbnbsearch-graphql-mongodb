//import { userTypeDefs } from './users';
import { listingTypeDefs } from './listings';
import resolvers from '../resolvers/index';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import _ from 'lodash'

const typeDefs = _.merge(
    //userTypeDefs,
    listingTypeDefs
)

const schemas: ApolloServerExpressConfig = {
    typeDefs,
    resolvers,
    introspection: true,
    // context: async ({ req, connection, payload }: any) => {
    //     if (connection) {
    //         return { isAuth: payload.authToken };
    //     }
    //     return { isAuth: req.isAuth };
    // },
    playground: true
};

export default schemas;