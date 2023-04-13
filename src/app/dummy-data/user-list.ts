import { User } from "../models/users/user.model";

const users: User[] = [
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
                id: '1',
                billDate: new Date('2022-03-15'),
                dueDate: new Date('2022-04-05'),
                amount: 50.75,
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
                id: '1',
                billDate: new Date('2022-03-01'),
                dueDate: new Date('2022-03-21'),
                amount: 35.50,
                isPaid: true
            },
            {
                id: '2',
                billDate: new Date('2022-04-01'),
                dueDate: new Date('2022-04-21'),
                amount: 35.50,
                isPaid: false
            }
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
                id: '1',
                billDate: new Date('2022-03-01'),
                dueDate: new Date('2022-03-21'),
                amount: 80.25,
                isPaid: true
            },
            {
                id: '2',
                billDate: new Date('2022-04-01'),
                dueDate: new Date('2022-04-21'),
                amount: 85.50,
                isPaid: false
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