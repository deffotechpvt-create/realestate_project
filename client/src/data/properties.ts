import { Property } from '@/types/property';

export const MOCK_PROPERTIES: Property[] = [
    {
        _id: '1',
        title: 'Luxury 3BHK Apartment in CP',
        description: 'Experience premium living in the heart of New Delhi. This fully furnished apartment offers stunning city views and world-class amenities.',
        type: 'apartment',
        status: 'rent',
        location: {
            address: {
                city: 'New Delhi',
                state: 'Delhi',
                pincode: '110001'
            },
        },
        specifications: {
            bhk: 3,
            bathrooms: 3,
            superBuiltUpArea: 1800,
        },
        amenities: ['wifi', 'parking', 'gym', 'pool', 'security'],
        media: {
            images: [{
                url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
            }]
        },
        price: {
            amount: 85000,
            negotiable: true,
        },
    },
    {
        _id: '2',
        title: 'Modern Villa in Greater Kailash',
        description: 'Spacious 5BHK villa with private garden and terrace. Perfect for large families looking for luxury and privacy.',
        type: 'villa',
        status: 'sale',
        location: {
            address: {
                city: 'New Delhi',
                state: 'Delhi',
                pincode: '110048'
            },
        },
        specifications: {
            bhk: 5,
            bathrooms: 5,
            superBuiltUpArea: 4500,
        },
        amenities: ['garden', 'terrace', 'modular_kitchen', 'servant_quarter', 'power_backup'],
        media: {
            images: [{
                url: 'https://images.unsplash.com/photo-1613977257377-234e7ef56f5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
            }]
        },
        price: {
            amount: 85000000,
            negotiable: true,
        },
    },
    {
        _id: '3',
        title: 'Premium Office Space in Noida',
        description: 'Grade A office space located in the business hub of Noida. Ideal for IT companies and startups.',
        type: 'commercial',
        status: 'rent',
        location: {
            address: {
                city: 'Noida',
                state: 'Uttar Pradesh',
                pincode: '201301'
            },
        },
        specifications: {
            bhk: 0,
            bathrooms: 2,
            superBuiltUpArea: 2500,
        },
        amenities: ['central_ac', 'conference_room', 'cafeteria', 'high_speed_internet', 'metro_connectivity'],
        media: {
            images: [{
                url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2301&q=80',
            }]
        },
        price: {
            amount: 150000,
            negotiable: false,
        },
    },
    {
        _id: '4',
        title: 'Compact Studio Apartment',
        description: 'Compact living style in the heart of the corporate hub.',
        type: 'apartment',
        status: 'sale',
        location: {
            address: {
                city: 'Gurgaon',
                state: 'Haryana',
                pincode: '122002'
            },
        },
        specifications: {
            bhk: 1,
            bathrooms: 1,
            superBuiltUpArea: 600,
        },
        amenities: ['lift', 'security', 'cctv', 'water_supply'],
        media: {
            images: [{
                url: 'https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=2787&auto=format&fit=crop',
            }]
        },
        price: {
            amount: 4500000,
            negotiable: true,
        },
    },
    {
        _id: '5',
        title: 'Sea View Penthouse',
        description: 'Top of the world with breathtaking ocean views.',
        type: 'apartment',
        status: 'sale',
        location: {
            address: {
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400050'
            },
        },
        specifications: {
            bhk: 4,
            bathrooms: 5,
            superBuiltUpArea: 3200,
        },
        amenities: ['sea_view', 'club_house', 'gym', 'swimming_pool', 'private_lift'],
        media: {
            images: [{
                url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop',
            }]
        },
        price: {
            amount: 125000000,
            negotiable: false,
        },
    },
    {
        _id: '6',
        title: 'Cozy Family Home',
        description: 'Peaceful neighborhood with schools nearby.',
        type: 'house',
        status: 'rent',
        location: {
            address: {
                city: 'Bangalore',
                state: 'Karnataka',
                pincode: '560001'
            },
        },
        specifications: {
            bhk: 3,
            bathrooms: 2,
            superBuiltUpArea: 1500,
        },
        amenities: ['garden', 'pet_friendly', 'close_to_market', '24h_water'],
        media: {
            images: [{
                url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2865&auto=format&fit=crop',
            }]
        },
        price: {
            amount: 35000,
            negotiable: true,
        },
    }
];
