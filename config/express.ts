import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import * as http from 'http';
import schemas from '../server/graphql/schema/index';
import auth from '../server/middleware/auth';
import config from './index';

class Express {
    public app: express.Application;
    public server: ApolloServer = new ApolloServer(schemas);
    public httpServer: http.Server;
    public init = (): void => {
        this.app = express();
        /**
         * Middlerware for using CORS
         */
        this.app.use(cors({
            origin(origin, callback) {
                /**
                 * Allow requests with no origin
                 * Like mobile apps or curl requests
                 */
                if (!origin) { return callback(null, true); }
                if (config.allowedOrigins.indexOf(origin) === -1) {
                    const msg = `The CORS policy for this site does not
          allow access from the specified Origin.`;
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            }
        }));
        /**
         *  Middlerware for extracting authToken
         */
        this.app.use(auth);
        this.server.applyMiddleware({ app: this.app });
        this.httpServer = http.createServer(this.app);
        /**
         * Installing subscription handlers
         */
        this.server.installSubscriptionHandlers(this.httpServer);
    }
}

export default Express;
