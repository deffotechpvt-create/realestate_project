export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'tenant' | 'buyer' | 'owner' | 'admin';
  isVerified: boolean;
  subscription: {
    plan: 'free' | 'basic' | 'premium';
    expiryDate?: string;
    contactsUnlocked: number;
  };
  shortlistedProperties: string[];
  createdAt: string;
}

export interface Property {
  _id: string;
  owner: string | User;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'villa' | 'plot' | 'commercial';
  status: 'rent' | 'sale';
  location: {
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      fullAddress: string;
    };
    coordinates: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude]
    };
  };
  specifications: {
    bhk: number;
    bathrooms?: number;
    balconies?: number;
    totalFloors?: number;
    floorNumber?: number;
    superBuiltUpArea?: number;
    carpetArea?: number;
    furnishing: 'unfurnished' | 'semi-furnished' | 'fully-furnished';
    parking: 'none' | 'bike' | 'car' | 'both';
  };
  amenities: string[];
  media: {
    images: {
      url: string;
      publicId: string;
    }[];
    videos: {
      url: string;
      publicId: string;
    }[];
  };
  price: {
    amount: number;
    negotiable: boolean;
    maintenance?: number;
    securityDeposit?: number;
  };
  verification: {
    isVerified: boolean;
    verifiedBy?: string;
    verificationDate?: string;
  };
  availability: {
    availableFrom: string;
    isAvailable: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  type?: string;
  status?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bhk?: number;
}
