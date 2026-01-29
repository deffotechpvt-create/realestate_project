export interface Property {
    _id: string;
    title: string;
    description: string;
    type: string;
    status: string;
    price: {
        amount: number;
        negotiable: boolean;
    };
    location: {
        address: {
            city: string;
            state: string;
            pincode?: string;
        };
    };
    specifications: {
        bhk: number;
        bathrooms: number;
        superBuiltUpArea: number;
    };
    amenities: string[];
    media: {
        images: { url: string }[];
    };
}
