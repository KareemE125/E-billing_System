import { CommonUser } from "./common.model";

export interface ServiceProvider extends CommonUser {
    offers: Offer[]
}
//all fields are required

export interface Offer {
    svProvName: string,
    name: string,
    units: number | "Per Usage",    //undefined if post paid
    priceOrPricePerUnit: number,    //undefined if post paid
    status: "Pre Paid" | "Post Paid",
}

//all fields are required

export let telephoneOfferStatuses: string[] = ["Pre Paid", "Post Paid"]
