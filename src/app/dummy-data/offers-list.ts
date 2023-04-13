import { Offer } from "../models/users/serviceProvider.model";

export const dummy_offers: Offer[] = [
    {
        name: "Offer A1",
        internetQuantity: 10,
        minutesQuantity: "PerUsage",
        price: 50,
        status: "PostPaid",
    },
    {
        name: "Offer A2",
        internetQuantity: "PerUsage",
        minutesQuantity: 100,
        price: 75,
        status: "PrePaid",
    },
    {
        name: "Offer B1",
        internetQuantity: "PerUsage",
        minutesQuantity: 200,
        price: 100,
        status: "PrePaid",
    },
    {
        name: "Offer B2",
        internetQuantity: 20,
        minutesQuantity: "PerUsage",
        price: 60,
        status: "PostPaid",
    },
]

