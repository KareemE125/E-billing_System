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
            paymentDate: 1 ,
            paymentMethod: 'Cash' ,
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
            paymentDate: 1 ,
            paymentMethod: 'Cash' ,
            id: '122354',
            serviceProviderName: 'serviceProviderName',
            offerName: 'offerName',
            offerMin: 54,
            offerInt: 1
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
            paymentDate: 1 ,
            paymentMethod: 'Cash' ,
            id: '122354'
          }
        ]
      },
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
                serviceProviderName:"Provider A",
                offerName:"Offer A1",
                paymentDate: Date.now(), paymentMethod: "Cash",
                offerMin: 10,
                offerInt: 10,
            },
            {
                id: '2',
                year: 2023,
                month: 2,
                units: 200,
                penalty: 40,
                total: 240,
                isPaid: true,
                serviceProviderName:"Provider A",
                offerName: "Offer A2",
                paymentDate: Date.now(), paymentMethod: "Cash",
                offerMin: 10,
                offerInt: 10,
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
    ];
  
    return users;
  }


export function getSeedOffers():Offer[]{
    const offers:Offer[]=[
        {
            name: "Offer A1",
            internetQuantityOrPrice: 0.1,
            minutesQuantityOrPrice: 0.1,
            price: "Per Usage",
            status: "Pre Paid",
            svProvName: "svProv1"
        },
        {
            name: "Offer A2",
            internetQuantityOrPrice: 50,
            minutesQuantityOrPrice: 100,
            price: 75,
            status: "Pre Paid",
            svProvName: "svProv1"
    
        },
        {
            name: "Offer B1",
            internetQuantityOrPrice: 100,
            minutesQuantityOrPrice: 200,
            price: 100,
            status: "Pre Paid",
            svProvName: "svProv1"
    
        },
        {
            name: "Offer B2",
            internetQuantityOrPrice: 20,
            minutesQuantityOrPrice: 50,
            price: 60,
            status: "Pre Paid",
            svProvName: "svProv1"
    
        },
    ]

    return offers;
}

export function getServiceProviders():ServiceProvider[] {

    const serviceProviders:ServiceProvider[]=[
        {
            id: "1",
            name: "Provider A",
            email: "providera@example.com",
            phoneNumber: "+1234567890",
            password: "password",
            address: {
                street: "123 Main Street",
                buildingNum: 1,
                city: "New York",
                country: "USA",
            },
            offers: [
                getSeedOffers()[0],
                getSeedOffers()[1],
            ],
        },
        {
            id: "2",
            name: "Provider B",
            email: "providerb@example.com",
            phoneNumber: "+0987654321",
            password: "password",
            address: {
                street: "456 Main Street",
                buildingNum: 2,
                city: "Los Angeles",
                country: "USA",
            },
            offers: [
                getSeedOffers()[2],
                getSeedOffers()[3],
            ],
        },
    ];

    return serviceProviders;
}
    