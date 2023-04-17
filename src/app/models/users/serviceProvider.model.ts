import { CommonUser } from "./common.model";

export interface ServiceProvider extends CommonUser {
    offers: Offer[]
}
//all fields are required

export interface Offer {
    name: string,
    internetQuantityOrPrice: number,  //internetQuantity in mbs if prepaid, and price per mb if postpaid
    minutesQuantityOrPrice: number, //minutesQuantity  if prepaid, and price per min if postpaid
    price: number | "Per Usage",
    status: "Pre Paid" | "Post Paid",
}

//all fields are required

export let offerStatuses: string[] = ["Pre Paid", "Post Paid"]

