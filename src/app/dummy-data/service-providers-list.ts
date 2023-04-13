import { ServiceProvider } from "../models/users/serviceProvider.model";
import { dummy_offers } from "./offers-list";

export const dummy_serviceProviders: ServiceProvider[] = [
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
            dummy_offers[0],
            dummy_offers[1],
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
            dummy_offers[2],
            dummy_offers[3],
        ],
    },
];

