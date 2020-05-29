import { PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import Listing from '../../models/listing';
import { getConnection } from 'typeorm';
import { transformListing } from './mergeListing';
const pubsub = new PubSub();

const LISTING_ADDED = 'LISTING_ADDED';

/**
 * Listing Queries
 */
const ListingQueries = {
    listings: async (parent, args, context) => {
        try {
            const listings = await Listing.find();
            return listings.map((listing) => {
                return transformListing(listing);
            });
        } catch (err) {
            throw err;
        }
    },
    listing: async (parent, { ListingId }) => {
        try {
            const listing = await Listing.findById(ListingId);
            return transformListing(listing);
        } catch (err) {
            throw err;
        }
    },
    searchListings: async (
        _: any,
        { input: { name, person_capacity, room_type, room_and_property_type, price_rate, amenities } }: any
    ) => {
        let listingQB = getConnection()
            .getRepository(Listing)
            .createQueryBuilder('l');

        if (name) {
            listingQB = listingQB.andWhere('l.name ilike :name', {
                name: `%${name}%`
            });
        }
        if (person_capacity) {
            listingQB = listingQB.andWhere('l.person_capacity = :person_capacity',
            { person_capacity });
        }
        if (room_type) {
            listingQB = listingQB.andWhere('l.room_type = :room_type', { room_type });
        }
        if (room_and_property_type) {
            listingQB = listingQB.andWhere('l.room_and_property_type = :room_and_property_type', { room_and_property_type });
        }
        if (price_rate) {
            listingQB = listingQB.andWhere('l.price_rate = :price_rate',
            { price_rate });
        }
        if (amenities) {
            listingQB = listingQB.andWhere('l.amenities ilike :amenities', {
                amenities: `%${amenities}%`
            });
        }
    }
};

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
                    name: ListingInput.name,
                    category: ListingInput.category,
                    url: ListingInput.url,
                    description: ListingInput.description,
                    price_rate: ListingInput.price_rate,
                    room_type: ListingInput.room_type,
                    room_and_property_type: ListingInput.room_and_property_type,
                    latitude: ListingInput.latitude,
                    longitude: ListingInput.longitude,
                    person_capacity: ListingInput.person_capacity,
                    amenities: ListingInput.amenities
                });
                const savedListing = await newListing.save();
                pubsub.publish(LISTING_ADDED, {
                    ListingAdded: transformListing(savedListing)
                });
                return transformListing(listing);
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
    listingAdded: {
        subscribe: () => pubsub.asyncIterator([LISTING_ADDED])
    }
};

export { ListingQueries, ListingMutation, ListingSubscription };
