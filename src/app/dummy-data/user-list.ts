import { User } from "../models/users/user.model";
import { dummy_serviceProviders } from "./service-providers-list";

export const dummy_users: User[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
        password: 'password1',
        address: {
            street: 'Main St',
            buildingNum: 123,
            city: 'Anytown',
            country: 'USA'
        },
        waterBills: [
            {
                year: 2023,
                month: 1,
                usage: 100,
                penalty: 0,
                total: 100,
                isPaid: true
            }
        ],
        telephoneBills: [],
        electrictyBills: []
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        phoneNumber: '2345678901',
        password: 'password2',
        address: {
            street: 'Broadway',
            buildingNum: 456,
            city: 'Anytown',
            country: 'USA'
        },
        waterBills: [],
        telephoneBills: [
            {
                year: 2023,
                month: 2,
                usage: 200,
                penalty: 20,
                total: 220,
                isPaid: true,
                serviceProvider: dummy_serviceProviders[0],
                offerName: dummy_serviceProviders[0].offers[0].name
            },
            {
                year: 2023,
                month: 2,
                usage: 200,
                penalty: 40,
                total: 240,
                isPaid: true,
                serviceProvider: dummy_serviceProviders[0],
                offerName: dummy_serviceProviders[0].offers[1].name
            },
        ],
        electrictyBills: []
    },
    {
        id: '3',
        name: 'Bob Johnson',
        email: 'bobjohnson@example.com',
        phoneNumber: '3456789012',
        password: 'password3',
        address: {
            street: 'Park Ave',
            buildingNum: 789,
            city: 'Anytown',
            country: 'USA'
        },
        waterBills: [],
        telephoneBills: [],
        electrictyBills: [
            {
                year: 2023,
                month: 1,
                usage: 100,
                penalty: 0,
                total: 100,
                isPaid: true
            }
        ]
    },
    {
        id: '4',
        name: 'Alice Lee',
        email: 'alicelee@example.com',
        phoneNumber: '4567890123',
        password: 'password4',
        address: {
            street: 'High St',
            buildingNum: 456,
            city: 'Anytown',
            country: 'USA'
        },
        waterBills: [],
        telephoneBills: [],
        electrictyBills: []
    }
]

