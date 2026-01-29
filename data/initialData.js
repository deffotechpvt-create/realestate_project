const users = [
    {
        name: 'Demo Admin',
        email: 'admin@estateprime.com',
        phone: '9876543210',
        password: 'password123', // In a real app, hash this
        role: 'admin',
        isVerified: true
    },
    {
        name: 'John Owner',
        email: 'john@example.com',
        phone: '9876543211',
        password: 'password123',
        role: 'owner',
        isVerified: true
    }
];

const properties = [
    {
        title: 'Luxury 3BHK Apartment in CP',
        description: 'Experience premium living in the heart of New Delhi. This fully furnished apartment offers stunning city views and world-class amenities.',
        type: 'apartment',
        status: 'rent',
        location: {
            address: {
                street: 'Block A, Connaught Place',
                city: 'New Delhi',
                state: 'Delhi',
                zipCode: '110001',
                fullAddress: 'A-12, Inner Circle, Connaught Place, New Delhi'
            },
            coordinates: {
                type: 'Point',
                coordinates: [77.2167, 28.6328]
            }
        },
        specifications: {
            bhk: 3,
            bathrooms: 3,
            balconies: 2,
            totalFloors: 12,
            floorNumber: 8,
            superBuiltUpArea: 1800,
            carpetArea: 1500,
            furnishing: 'fully-furnished',
            parking: 'car'
        },
        amenities: ['Power Backup', 'Lift', 'Security', 'Gym', 'Swimming Pool'],
        media: {
            images: [{
                url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
                publicId: 'dummy1'
            }]
        },
        price: {
            amount: 85000,
            negotiable: true,
            maintenance: 5000,
            securityDeposit: 170000
        },
        verification: {
            isVerified: true
        }
    },
    {
        title: 'Modern Villa in Greater Kailash',
        description: 'Spacious 5BHK villa with private garden and terrace. Perfect for large families looking for luxury and privacy.',
        type: 'villa',
        status: 'sale',
        location: {
            address: {
                street: 'GK Part 2',
                city: 'New Delhi',
                state: 'Delhi',
                zipCode: '110048',
                fullAddress: 'E-45, Greater Kailash Part 2, New Delhi'
            },
            coordinates: {
                type: 'Point',
                coordinates: [77.2433, 28.5293]
            }
        },
        specifications: {
            bhk: 5,
            bathrooms: 5,
            balconies: 4,
            totalFloors: 3,
            superBuiltUpArea: 4500,
            carpetArea: 4000,
            furnishing: 'semi-furnished',
            parking: 'both'
        },
        amenities: ['Private Garden', 'Terrace', 'Servant Quarter', 'Modular Kitchen'],
        media: {
            images: [{
                url: 'https://images.unsplash.com/photo-1613977257377-234e7ef56f5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
                publicId: 'dummy2'
            }]
        },
        price: {
            amount: 85000000,
            negotiable: true
        },
        verification: {
            isVerified: true
        }
    },
    {
        title: 'Premium Office Space in Noida',
        description: 'Grade A office space located in the business hub of Noida. Ideal for IT companies and startups.',
        type: 'commercial',
        status: 'rent',
        location: {
            address: {
                street: 'Sector 62',
                city: 'Noida',
                state: 'Uttar Pradesh',
                zipCode: '201309',
                fullAddress: 'Tower B, Cyber Park, Sector 62, Noida'
            },
            coordinates: {
                type: 'Point',
                coordinates: [77.3639, 28.6208]
            }
        },
        specifications: {
            bhk: 0,
            bathrooms: 2,
            totalFloors: 20,
            floorNumber: 5,
            superBuiltUpArea: 2500,
            carpetArea: 2000,
            furnishing: 'fully-furnished',
            parking: 'car'
        },
        amenities: ['Central AC', 'Cafeteria', 'Conference Room', 'High Speed Internet'],
        media: {
            images: [{
                url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2301&q=80',
                publicId: 'dummy3'
            }]
        },
        price: {
            amount: 150000,
            negotiable: false,
            maintenance: 15000,
            securityDeposit: 450000
        },
        verification: {
            isVerified: true
        }
    }
];

module.exports = { users, properties };
