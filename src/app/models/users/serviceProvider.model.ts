import { CommonUser } from "./common.model";

export interface ServiceProvider extends CommonUser {
    offers: Offer[]
}
//all fields are required

export interface Offer {
    svProvName: string,
    name: string,
    units: number,
    price: number,
    status: "Pre Paid" | "Post Paid",
}

//all fields are required

export let telephoneOfferStatuses: string[] = ["Pre Paid", "Post Paid"]
