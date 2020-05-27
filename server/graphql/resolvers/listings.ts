import { PubSub } from 'apollo-server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config';
import Listing from '../../models/listing';
import { transformListing } from './mergeListing';
const pubsub = new PubSub();

const Listing_ADDED = 'Listing_ADDED';

/**
 * Listing Queries
 */
const ListingQueries = {
    Listings: async (parent, args) => {
        try {
            const listings = await Listing.find();
            return listings.map((listing) => {
                return transformListing(listing);
            });
        } catch (err) {
            throw err;
        }
    },
    Listing: async (parent, { ListingId }) => {
        try {
            const listing = await Listing.findById(ListingId);
            return transformListing(listing);
        } catch (err) {
            throw err;
        }
    },
    searchListings: async (
        _: any,
        { input: { name, room_type, room_and_property_type, price_rate }, limit, offset }: any
    ) => {
        if (guests) {
            listingQB = listingQB.andWhere("l.guests = :guests", { guests });
        }
        if (beds) {
            listingQB = listingQB.andWhere("l.beds = :beds", { beds });
        }
        if (name) {
            listingQB = listingQB.andWhere("l.name ilike :name", {
                name: `%${name}%`
            });
        }
    }};

/**
 * Listing Mutations
 */
const ListingMutation = {
    createListing: async (parent: any, { ListingInput }: any) => {
        try {
            const listing = await Listing.findOne({
                url: ListingInput.url
            });
            if (listing) {
                throw new Error('Listing already Exists');
            } else {
                const newListing = new Listing({
                    _id: new mongoose.Types.ObjectId(),
                    email: ListingInput.email,
                    name: ListingInput.name,
                    password: ListingInput.password
                });
                const savedListing = await newListing.save();
                pubsub.publish(Listing_ADDED, {
                    ListingAdded: transformListing(savedListing)
                });
                const token = jwt.sign({ ListingId: savedListing.id }, config.jwtSecret, {
                    expiresIn: '1h'
                });
                return {
                    ListingId: savedListing.id,
                    token,
                    tokenExpiration: 1
                };
            }
        } catch (error) {
            throw error;
        }
    },
    updateListing: async (parent, { ListingId, updateListing }) => {
        try {
            const listing = await Listing.findByIdAndUpdate(ListingId, updateListing, {
                new: true
            });
            return transformListing(listing);
        } catch (error) {
            throw error;
        }
    },
    deleteListing: async (parent, { ListingId }) => {
        try {
            const listing = await Listing.remove(ListingId);
            return transformListing(listing);
        } catch (error) {
            throw error;
        }
    }
};

/**
 * Listing Subscriptions
 */
const ListingSubscription = {
    ListingAdded: {
        subscribe: () => pubsub.asyncIterator([Listing_ADDED])
    }
};

export { ListingQueries, ListingMutation, ListingSubscription };
