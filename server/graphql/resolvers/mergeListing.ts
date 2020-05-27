import dateToString from '../../helpers/date';
import Listing from '../../models/listing';

// Get Listings
const getListing = async (id: string) => {
    try {
        const listing: any = await Listing.findById(id);
        return {
            ...listing._doc,
            _id: listing.id,
            createdAt: dateToString(listing._doc.createdAt),
            updatedAt: dateToString(listing._doc.updatedAt)
        };
    } catch (err) {
        throw err;
    }
};

// Takes a user object and returns the data
const transformListing = (listing: any) => {
    return {
        ...listing._doc,
        _id: listing.id,
        createdAt: dateToString(listing._doc.createdAt),
        updatedAt: dateToString(listing._doc.updatedAt)
    };
};

export { getListing, transformListing };
