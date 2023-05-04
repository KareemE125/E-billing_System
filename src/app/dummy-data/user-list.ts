import { User } from "../models/users/user.model";
import { dummy_serviceProviders } from "./service-providers-list";

export const dummy_users: User[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
        password: 'password1',
        wallet: 50,
        address: {
            street: 'Main St',
            buildingNum: 123,
            city: 'Anytown',
            country: 'USA'
        },
        waterBills: [
            {
                id: '1',
                year: 2023,
                month: 1,
                units: 100,
                penalty: 0,
                total: 100,
                isPaid: true,
                paymentDate: Date.now(), paymentMethod: "Cash"
            }
        ],
        telephoneBills: [],
        electricityBills: []
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        phoneNumber: '2345678901',
        password: 'password2',
        wallet: 100,
        address: {
            street: 'Broadway',
            buildingNum: 456,
            city: 'Anytown',
            country: 'USA'
        },
        waterBills: [],
        telephoneBills: [
            {
                id: '1',
                year: 2023,
                month: 2,
                units: 200,
                penalty: 20,
                total: 220,
                isPaid: true,
                serviceProviderName: dummy_serviceProviders[0].name,
                offerName: dummy_serviceProviders[0].offers[0].name,
                paymentDate: Date.now(), paymentMethod: "Cash",
                offerUnits: 10,
            },
            {
                id: '2',
                year: 2023,
                month: 2,
                units: 200,
                penalty: 40,
                total: 240,
                isPaid: true,
                serviceProviderName: dummy_serviceProviders[0].name,
                offerName: dummy_serviceProviders[0].offers[1].name,
                paymentDate: Date.now(), paymentMethod: "Cash",
                offerUnits: 10,
            },
        ],
        electricityBills: []
    },
    {
        id: '3',
        name: 'Bob Johnson',
        email: 'bobjohnson@example.com',
        phoneNumber: '3456789012',
        password: 'password3',
        wallet: 300,
        address: {
            street: 'Park Ave',
            buildingNum: 789,
            city: 'Anytown',
            country: 'USA'
        },
        waterBills: [],
        telephoneBills: [],
        electricityBills: [
            {
                id: '1',
                year: 2023,
                month: 1,
                units: 100,
                penalty: 0,
                total: 100,
                isPaid: true,
                paymentDate: Date.now(), paymentMethod: "Cash"
            }
        ]
    },
    {
        id: '4',
        name: 'Alice Lee',
        email: 'alicelee@example.com',
        phoneNumber: '4567890123',
        password: 'password4',
        wallet: 400,
        address: {
            street: 'High St',
            buildingNum: 456,
            city: 'Anytown',
            country: 'USA'
        },
        waterBills: [],
        telephoneBills: [],
        electricityBills: []
    }
]

