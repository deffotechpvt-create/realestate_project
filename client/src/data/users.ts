import { User } from '@/types';

export const MOCK_USERS: User[] = [
    {
        _id: '1',
        name: 'Admin User',
        email: 'admin@estateprime.com',
        phone: '9876543210',
        role: 'admin',
        isVerified: true,
        subscription: {
            plan: 'premium',
            contactsUnlocked: 9999
        },
        shortlistedProperties: [],
        createdAt: '2023-01-01'
    },
    {
        _id: '2',
        name: 'Agent Smith',
        email: 'agent@estateprime.com',
        phone: '9876543211',
        role: 'agent',
        isVerified: true,
        subscription: {
            plan: 'basic',
            contactsUnlocked: 100
        },
        shortlistedProperties: [],
        createdAt: '2023-02-15'
    },
    {
        _id: '3',
        name: 'John Doe',
        email: 'user@gmail.com',
        phone: '9876543212',
        role: 'buyer',
        isVerified: true,
        subscription: {
            plan: 'free',
            contactsUnlocked: 5
        },
        shortlistedProperties: ['1', '2'],
        createdAt: '2023-03-10'
    }
];
