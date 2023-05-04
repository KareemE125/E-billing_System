import { User } from "../shared/models/users/user.model";
import { Offer } from "../shared/models/users/serviceProvider.model";
import { ServiceProvider } from "../shared/models/users/serviceProvider.model";
import { Admin } from "../shared/models/users/admin.model";
import * as uuid from 'uuid';

export function getDummyUsers(): User[] {
    const users: User[] = [
        {
            id: uuid.v4(),
            name: 'user',
            email: 'user1@gmail.com',
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
                    year: 2022,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1000,
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + 1000 * (getDummyServiceProviders()[0].offers[0].priceOrPricePerUnit),     //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[0].name,
                    offerName: getDummyServiceProviders()[0].offers[0].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 2,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 4,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
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
            email: 'johndoe@gmail.com',
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
            telephoneBills: [
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 2,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 4,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                }
            ],
            electricityBills: []
        },
        {
            id: uuid.v4(), name: 'Jane Smith',
            email: 'janesmith@gmail.com',
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
                    year: 2022,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1000,
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + 1000 * (getDummyServiceProviders()[2].offers[0].priceOrPricePerUnit),     //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[2].name,
                    offerName: getDummyServiceProviders()[2].offers[0].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: getDummyServiceProviders()[3].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[3].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[3].name,
                    offerName: getDummyServiceProviders()[3].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 2,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 4,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                }
            ],
            electricityBills: []
        },
        {
            id: uuid.v4(), name: 'Bob Johnson',
            email: 'bobjohnson@gmail.com',
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
            telephoneBills: [
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 2,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 4,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                }
            ],
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
            email: 'alicelee@gmail.com',
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
            email: 'Salah@gmail.com',
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
                    year: 2022,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1000,
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + 1000 * (getDummyServiceProviders()[0].offers[0].priceOrPricePerUnit),     //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[0].name,
                    offerName: getDummyServiceProviders()[0].offers[0].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 2,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 4,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
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
            email: 'Mezo@gmail.com',
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
                    year: 2022,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1000,
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + 1000 * (getDummyServiceProviders()[0].offers[0].priceOrPricePerUnit),     //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[0].name,
                    offerName: getDummyServiceProviders()[0].offers[0].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 2,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 4,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
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
            email: 'Kemo@gmail.com',
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
                    year: 2022,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: 1000,
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + 1000 * (getDummyServiceProviders()[0].offers[0].priceOrPricePerUnit),     //0 <= total <= 100000
                    isPaid: true,   //true or false
                    paymentDate: 1,
                    paymentMethod: 'Cash',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[0].name,
                    offerName: getDummyServiceProviders()[0].offers[0].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 1,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 2,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 3,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
                },
                {
                    year: 2023,       //1990 <= year <= 2022
                    month: 4,      //1 <= month <= 12
                    units: getDummyServiceProviders()[1].offers[1].units as number,      //0 <= units <= 100000
                    penalty: 11,    //0 <= penalty <= 100000
                    total: 11 + getDummyServiceProviders()[1].offers[1].priceOrPricePerUnit,      //0 <= total <= 100000
                    isPaid: false,   //true or false
                    paymentDate: 'Not Yet',
                    paymentMethod: 'Not Yet',
                    id: uuid.v4(),
                    serviceProviderName: getDummyServiceProviders()[1].name,
                    offerName: getDummyServiceProviders()[1].offers[1].name,
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
                    units: "Per Usage",
                    priceOrPricePerUnit: 0.1,
                    status: "Post Paid",
                    svProvName: "WE"
                },
                {
                    name: "WE Offer 2",
                    units: 1500,
                    priceOrPricePerUnit: 140,
                    status: "Pre Paid",
                    svProvName: "WE"
                }
            ],
        },
        {
            id: uuid.v4(),
            name: "Vodafone",
            email: "vodafone@gmail.com",
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
                    name: "Vodafone Offer 1",
                    units: "Per Usage",
                    priceOrPricePerUnit: 0.1,
                    status: "Post Paid",
                    svProvName: "Vodafone"
                },
                {
                    name: "Vodafone Offer 2",
                    units: 2000,
                    priceOrPricePerUnit: 180,
                    status: "Pre Paid",
                    svProvName: "Vodafone"
                }
            ],
        },
        {
            id: uuid.v4(),
            name: "Etisalat",
            email: "etisalat@gmail.com",
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
                    name: "Etisalat Offer 1",
                    units: "Per Usage",
                    priceOrPricePerUnit: 0.2,
                    status: "Post Paid",
                    svProvName: "Etisalat"
                },
                {
                    name: "Etisalat Offer 2",
                    units: 1300,
                    priceOrPricePerUnit: 110,
                    status: "Pre Paid",
                    svProvName: "Etisalat"
                }
            ],
        },
        {
            id: uuid.v4(), name: "Orange",
            email: "orange@gmail.com",
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
                    name: "Orange Offer 1",
                    units: "Per Usage",
                    priceOrPricePerUnit: 0.1,
                    status: "Post Paid",
                    svProvName: "Orange"
                },
                {
                    name: "Orange Offer 2",
                    units: 2500,
                    priceOrPricePerUnit: 220,
                    status: "Pre Paid",
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