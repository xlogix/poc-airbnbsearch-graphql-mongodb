import dateToString from '../../helpers/date';
import Listing from '../../models/listing';

/**
 * Get listing object with schema typing
 * @param id
 */
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

/**
 * Get listing object with schema typing
 * @param listing
 */
const transformListing = (listing: any) => {
    return {
        ...listing._doc,
        _id: listing.id,
        createdAt: dateToString(listing._doc.createdAt),
        updatedAt: dateToString(listing._doc.updatedAt)
    };
};

export { getListing, transformListing };
