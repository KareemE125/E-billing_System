import { User } from "../models/users/user.model";
import { Offer } from "../models/users/serviceProvider.model";
import { ServiceProvider } from "../models/users/serviceProvider.model";
import { Admin } from "../models/users/admin.model";
import * as uuid from 'uuid';

export function getDummyUsers(): User[] {
    const users: User[] = [
        {
            id: uuid.v4(),
            name: 'user',
            email: 'user@gmail.com',
            password: "passwordD",//: 'Test123456##',
            phoneNumber: '01000000000',
            address: {
                street: 'street',
                buildingNum: 1,
                city: 'string',
                country: 'string'
            },
            wallet: 3000,
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
                    id: uuid.v4(),
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
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[0].name,
                    offerName: getDummyServiceProviders()[0].offers[0].name,
                    offerUnits: getDummyServiceProviders()[0].offers[0].units
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
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                    offerUnits: getDummyServiceProviders()[1].offers[1].units
                }
            ],
            electricityBills: [
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 100,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 2,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 150,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                }
            ]
        },
        {
            id: uuid.v4(), name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '01000000000',
            password: "passwordD",//password: 'passwordD1',
            wallet: 50,
            address: {
                street: 'Main St',
                buildingNum: 123,
                city: 'Anytown',
                country: 'USA'
            },
            waterBills: [
                {
                    id: uuid.v4(), year: 2023,
                    month: 1,
                    units: 100,
                    penalty: 0,
                    total: 100,
                    isPaid: true,
                    paymentDate: Date.now(),
                    paymentMethod: "Cash"
                },
                {
                    id: uuid.v4(), year: 2023,
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
            id: uuid.v4(), name: 'Jane Smith',
            email: 'janesmith@example.com',
            phoneNumber: '01000000000',
            password: "passwordD",//password: 'passwordD2',
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
                    id: uuid.v4(), year: 2023,
                    month: 2,
                    units: 200,
                    penalty: 20,
                    total: 220,
                    isPaid: true,
                    serviceProviderName: getDummyServiceProviders()[0].name,
                    paymentDate: Date.now(),
                    paymentMethod: "Cash",
                    offerName: getDummyServiceProviders()[0].offers[1].name,
                    offerUnits: getDummyServiceProviders()[0].offers[1].units
                },
                {
                    id: uuid.v4(), year: 2023,
                    month: 2,
                    units: 200,
                    penalty: 40,
                    total: 240,
                    isPaid: true,
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    paymentDate: Date.now(), paymentMethod: "Cash",
                    offerName: getDummyServiceProviders()[1].offers[0].name,
                    offerUnits: getDummyServiceProviders()[1].offers[0].units
                },
            ],
            electricityBills: []
        },
        {
            id: uuid.v4(), name: 'Bob Johnson',
            email: 'bobjohnson@example.com',
            phoneNumber: '01000000000',
            password: "passwordD",//password: 'passwordD3',
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
                    id: uuid.v4(), year: 2023,
                    month: 1,
                    units: 100,
                    penalty: 0,
                    total: 100,
                    isPaid: true,
                    paymentDate: Date.now(), paymentMethod: "Wallet"
                },
                {
                    id: uuid.v4(), year: 2023,
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
            id: uuid.v4(), name: 'Alice Lee',
            email: 'alicelee@example.com',
            phoneNumber: '01000000000',
            password: "passwordD",//password: 'passworDd4',
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
        },
        {
            id: uuid.v4(), name: 'Salah',
            email: 'Salah@example.com',
            phoneNumber: '01102527521',
            password: "passwordD",//password: 'passworDd4',
            wallet: 150000,
            address: {
                street: 'High St',
                buildingNum: 456,
                city: 'Anytown',
                country: 'USA'
            },
            waterBills: [
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 4,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1150,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 5,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 650,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
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
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[4].name,
                    offerName: getDummyServiceProviders()[2].offers[4].name,
                    offerUnits: getDummyServiceProviders()[2].offers[4].units
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
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                    offerUnits: getDummyServiceProviders()[1].offers[1].units
                }
            ],
            electricityBills: [
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 100,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 2,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 150,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                }
            ]
        },
        {
            id: uuid.v4(), name: 'Mezo',
            email: 'Mezo@example.com',
            phoneNumber: '01234567890',
            password: "passwordD",//password: 'passworDd4',
            wallet: 5000,
            address: {
                street: 'High St',
                buildingNum: 456,
                city: 'Anytown',
                country: 'USA'
            },
            waterBills: [
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 4,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1150,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 5,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 650,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
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
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[0].name,
                    offerName: getDummyServiceProviders()[0].offers[0].name,
                    offerUnits: getDummyServiceProviders()[0].offers[0].units
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
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                    offerUnits: getDummyServiceProviders()[1].offers[1].units
                }
            ],
            electricityBills: [
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 100,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 2,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 150,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                }
            ]
        },
        {
            id: uuid.v4(), name: 'Kemo',
            email: 'Kemo@example.com',
            phoneNumber: '01234567890',
            password: "passwordD",//password: 'passworDd4',
            wallet: 10000,
            address: {
                street: 'High St',
                buildingNum: 456,
                city: 'Anytown',
                country: 'USA'
            },
            waterBills: [
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 4,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1150,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 5,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 650,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
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
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[0].name,
                    offerName: getDummyServiceProviders()[0].offers[0].name,
                    offerUnits: getDummyServiceProviders()[0].offers[0].units
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
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                    offerUnits: getDummyServiceProviders()[1].offers[1].units
                }
            ],
            electricityBills: [
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 100,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 2,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 150,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: 1,      //0 <= units <= 100000
                    penalty: 1,    //0 <= penalty <= 100000
                    total: 1,      //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                }
            ]
        }

    ];

    return users;
}


export function getDummyOffers(): Offer[] {
    const offers: Offer[] = [
        {
            name: "Offer A1",
            units: 0.1,
            price: "Per Usage",
            status: "Post Paid",
            svProvName: "Provider A"
        },
        {
            name: "Offer A2",
            units: 50,
            price: 75,
            status: "Pre Paid",
            svProvName: "Provider A"

        },
        {
            name: "Offer B1",
            units: 100,
            price: 100,
            status: "Pre Paid",
            svProvName: "Provider B"

        },
        {
            name: "Offer B2",
            units: 20,
            price: 60,
            status: "Pre Paid",
            svProvName: "Provider B"

        },
        {
            name: "Offer B3",
            units: 50,
            price: 70,
            status: "Pre Paid",
            svProvName: "Provider B"

        },
        {
            name: "Offer B4",
            units: 1000,
            price: 1000,
            status: "Post Paid",
            svProvName: "Provider B"

        }
    ]

    return offers;
}

export function getDummyServiceProviders(): ServiceProvider[] {

    const serviceProviders: ServiceProvider[] = [
        {
            id: uuid.v4(),
            name: "WE",
            email: "we@gmail.com",
            phoneNumber: "01000000000",
            password: "passwordD",//password: "passwordD",
            address: {
                street: "123 Main Street",
                buildingNum: 1,
                city: "New York",
                country: "USA",
            },
            offers: [
                {
                    name: "WE Offer 1",
                    units: 0.1,
                    price: "Per Usage",
                    status: "Post Paid",
                    svProvName: "WE"
                },
                {
                    name: "WE Offer 2",
                    units: 0.5,
                    price: "Per Usage",
                    status: "Pre Paid",
                    svProvName: "WE"
                }
            ],
        },
        {
            id: uuid.v4(),
            name: "Vodafone",
            email: "vodafone@example.com",
            phoneNumber: "01000000000",
            password: "passwordD",//password: "passwordD",
            address: {
                street: "456 Main Street",
                buildingNum: 2,
                city: "Los Angeles",
                country: "USA",
            },
            offers: [
                {
                    name: "Vodafone Offer 2",
                    units: 0.5,
                    price: "Per Usage",
                    status: "Post Paid",
                    svProvName: "Vodafone"
                },
                {
                    name: "Vodafone Offer 2",
                    units: 0.8,
                    price: "Per Usage",
                    status: "Pre Paid",
                    svProvName: "Vodafone"
                }
            ],
        },
        {
            id: uuid.v4(),
            name: "Etisalat",
            email: "etisalat@example.com",
            phoneNumber: "01000000000",
            password: "passwordD",//password: "passwordD",
            address: {
                street: "456 Main Street",
                buildingNum: 2,
                city: "Los Angeles",
                country: "USA",
            },
            offers: [
                {
                    name: "Etisalat Offer 2",
                    units: 0.5,
                    price:70,
                    status: "Pre Paid",
                    svProvName: "Etisalat"
                },
                {
                    name: "Etisalat Offer 2",
                    units: 0.8,
                    price: "Per Usage",
                    status: "Post Paid",
                    svProvName: "Etisalat"
                }
            ],
        },
        {
            id: uuid.v4(), name: "Orange",
            email: "orange@example.com",
            phoneNumber: "01000000000",
            password: "passwordD",//password: "passwordD",
            address: {
                street: "456 Main Street",
                buildingNum: 2,
                city: "Los Angeles",
                country: "USA",
            },
            offers: [
                {
                    name: "Orange Offer 2",
                    units: 0.5,
                    price:50,
                    status: "Pre Paid",
                    svProvName: "Orange"
                },
                {
                    name: "Orange Offer 2",
                    units: 0.8,
                    price: "Per Usage",
                    status: "Post Paid",
                    svProvName: "Orange"
                }
            ],
        }
    ];

    return serviceProviders;
}

export function getDummyAdmins(): Admin[] {
    const admins: Admin[] = [
        {
            id: uuid.v4(), name: 'admin',
            email: 'admin1@gmail.com',
            password: "passwordD",//password: 'Admin123456##',
            phoneNumber: '01000000000',
            address: {
                street: 'street',
                buildingNum: 1,
                city: 'string',
                country: 'string'
            }
        },
        {
            id: uuid.v4(), name: 'admin2',
            email: 'admin2@gmail.com',
            password: "passwordD",//password: 'Admin123456##',
            phoneNumber: '01000000000',
            address: {
                street: 'street',
                buildingNum: 1,
                city: 'string',
                country: 'string'
            }
        },
        {
            id: uuid.v4(), name: 'admin3',
            email: 'admin3@gmail.com',
            password: "passwordD",//password: 'Admin123456##',
            phoneNumber: '01000000000',
            address: {
                street: 'street',
                buildingNum: 1,
                city: 'string',
                country: 'string'
            }
        },
        {
            id: uuid.v4(), name: 'admin4',
            email: 'admin4@gmail.com',
            password: "passwordD",//password: 'Admin123456##',
            phoneNumber: '01000000000',
            address: {
                street: 'street',
                buildingNum: 1,
                city: 'string',
                country: 'string'
            }
        },
        {
            id: uuid.v4(), name: 'admin5',
            email: 'admin5@gmail.com',
            password: "passwordD",//password: 'Admin123456##',
            phoneNumber: '01000000000',
            address: {
                street: 'street',
                buildingNum: 1,
                city: 'string',
                country: 'string'
            }
        }

    ];
    return admins;
}