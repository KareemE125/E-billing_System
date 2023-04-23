import { User } from "../models/users/user.model";
import { Offer } from "../models/users/serviceProvider.model";
import { ServiceProvider } from "../models/users/serviceProvider.model";

export function getDummyUsers(): User[] {
    const users: User[] = [
        {
            id: '15555555',
            name: 'user',
            email: 'user@gmail.com',
            password: 'Test123456##',
            phoneNumber: '01000000000',
            address: {
                street: 'street',
                buildingNum: 1,
                city: 'string',
                country: 'string'
            },
            wallet: 10000,
            waterBills: [
                {
                    year: 1,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: '122354'
                }
            ],
            telephoneBills: [
                {
                    year: 1,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: '122354',
                    serviceProviderName: getDummyServiceProviders()[0].name,
                    offerName: getDummyServiceProviders()[0].offers[0].name,
                    offerMin: getDummyServiceProviders()[0].offers[0].minutesQuantityOrPrice,
                    offerInt: getDummyServiceProviders()[0].offers[0].internetQuantityOrPrice
                },
                {
                    year: 1,       //1990 <= year <= 2022
                    month: 11,      //1 <= month <= 12
                    units: 11,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: '122354',
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                    offerMin: getDummyServiceProviders()[1].offers[1].minutesQuantityOrPrice,
                    offerInt: getDummyServiceProviders()[1].offers[1].internetQuantityOrPrice
                }
            ],
            electricityBills: [
                {
                    year: 1,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: '122354'
                },
                {
                    year: 1,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: '122354'
                }
            ]
        },
        {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '01000000000',
            password: 'passwordD1',
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
                    paymentDate: Date.now(),
                    paymentMethod: "Cash"
                },
                {
                    id: '2',
                    year: 2023,
                    month: 1,
                    units: 100,
                    penalty: 0,
                    total: 100,
                    isPaid: false,
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet'
                }
            ],
            telephoneBills: [],
            electricityBills: []
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'janesmith@example.com',
            phoneNumber: '01000000000',
            password: 'passwordD2',
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
                    serviceProviderName: getDummyServiceProviders()[0].name,
                    paymentDate: Date.now(),
                    paymentMethod: "Cash",
                    offerName: getDummyServiceProviders()[0].offers[1].name,
                    offerMin: getDummyServiceProviders()[0].offers[1].minutesQuantityOrPrice,
                    offerInt: getDummyServiceProviders()[0].offers[1].internetQuantityOrPrice
                },
                {
                    id: '2',
                    year: 2023,
                    month: 2,
                    units: 200,
                    penalty: 40,
                    total: 240,
                    isPaid: true,
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    paymentDate: Date.now(), paymentMethod: "Cash",
                    offerName: getDummyServiceProviders()[1].offers[0].name,
                    offerMin: getDummyServiceProviders()[1].offers[0].minutesQuantityOrPrice,
                    offerInt: getDummyServiceProviders()[1].offers[0].internetQuantityOrPrice
                },
            ],
            electricityBills: []
        },
        {
            id: '3',
            name: 'Bob Johnson',
            email: 'bobjohnson@example.com',
            phoneNumber: '01000000000',
            password: 'passwordD3',
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
                    paymentDate: Date.now(), paymentMethod: "Wallet"
                },
                {
                    id: '2',
                    year: 2023,
                    month: 1,
                    units: 100,
                    penalty: 0,
                    total: 100,
                    isPaid: false,
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet'
                }
            ]
        },
        {
            id: '4',
            name: 'Alice Lee',
            email: 'alicelee@example.com',
            phoneNumber: '01000000000',
            password: 'passworDd4',
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
    ];

    return users;
}


export function getDummyOffers(): Offer[] {
    const offers: Offer[] = [
        {
            name: "Offer A1",
            internetQuantityOrPrice: 0.1,
            minutesQuantityOrPrice: 0.1,
            price: "Per Usage",
            status: "Post Paid",
            svProvName: "Provider A"
        },
        {
            name: "Offer A2",
            internetQuantityOrPrice: 50,
            minutesQuantityOrPrice: 100,
            price: 75,
            status: "Pre Paid",
            svProvName: "Provider A"

        },
        {
            name: "Offer B1",
            internetQuantityOrPrice: 100,
            minutesQuantityOrPrice: 200,
            price: 100,
            status: "Pre Paid",
            svProvName: "Provider B"

        },
        {
            name: "Offer B2",
            internetQuantityOrPrice: 20,
            minutesQuantityOrPrice: 50,
            price: 60,
            status: "Pre Paid",
            svProvName: "Provider B"

        },
    ]

    return offers;
}

export function getDummyServiceProviders(): ServiceProvider[] {

    const serviceProviders: ServiceProvider[] = [
        {
            id: "1",
            name: "Provider A",
            email: "providera@example.com",
            phoneNumber: "01000000000",
            password: "passwordD",
            address: {
                street: "123 Main Street",
                buildingNum: 1,
                city: "New York",
                country: "USA",
            },
            offers: [
                getDummyOffers()[0],
                getDummyOffers()[1],
            ],
        },
        {
            id: "2",
            name: "Provider B",
            email: "providerb@example.com",
            phoneNumber: "01000000000",
            password: "passwordD",
            address: {
                street: "456 Main Street",
                buildingNum: 2,
                city: "Los Angeles",
                country: "USA",
            },
            offers: [
                getDummyOffers()[2],
                getDummyOffers()[3],
            ],
        },
    ];

    return serviceProviders;
}
