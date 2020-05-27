import Promise from 'bluebird';
import mongoose from 'mongoose';
import config from './config';
import Express from './config/express';

/**
 * Promisify All The Mongoose
 * @param mongoose
 */
Promise.promisifyAll(mongoose);

/**
 * Connecting Mongoose
 * @param uris
 * @param options
 */
mongoose.connect(config.db, {
    bufferMaxEntries: 0,
    keepAlive: true,
    socketTimeoutMS: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

/**
 * Throw error when not able to connect to database
 */
mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${config.db}`);
});

/**
 * Initialize Express
 */
const ExpressServer = new Express();
ExpressServer.init();

/**
 * Listen to port
 */
ExpressServer.httpServer.listen(process.env.PORT || config.port, () => {
    console.log(`🚀 Server ready at ${config.port}`);
    console.log(
        `🚀 Server ready at http://localhost:${config.port}${ExpressServer.server.graphqlPath}`
    );
    console.log(
        `🚀 Subscriptions ready at ws://localhost:${config.port}${ExpressServer.server.subscriptionsPath}`
    );
});
