import mongoose from 'mongoose';

/**
 * Listing Schema
 */
const listingSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: true
        },
        category: {
            type: String
        },
        url: {
            type: String
        },
        price_rate: {
            type: Number
        },
        price_rate_type: {
            type: String
        },
        total_price: {
            type: Number
        },
        room_and_property_type: {
            type: String
        },
        min_nights: {
            type: Number
        },
        max_nights: {
            type: Number
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
        room_type: {
            type: Number
        },
        person_capacity: {
            type: Number
        },
        amenities: [{
            type: String
        }],
        star_rating: {
            type: Number
        },
        description: {
            type: String
        },
        neighborhood_overview: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

/**
 * Statics
 */
listingSchema.statics = {
    /**
     * Get Listing
     * @param {ObjectId} id - The objectId of user.
     */
    get(id: string): mongoose.Document {
        return this.findById(id)
            .execAsync()
            .then((listing: any) => {
                if (listing) {
                    return listing;
                }
            });
    }
};

export default mongoose.model('Listing', listingSchema);
