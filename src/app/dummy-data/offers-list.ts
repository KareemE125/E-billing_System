import { Offer } from "../models/users/serviceProvider.model";

export const dummy_offers: Offer[] = [
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

