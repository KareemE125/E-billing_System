import { Common } from "./common.model";

export interface ServiceProvider extends Common {
    offers: Offer[]
}
//all fields are required

export interface Offer {
    name: string,
    internetQuantity: number | "PerUsage",
    minutesQuantity: number | "PerUsage",
    price: number,
    status: "PostPaid" | "PrePaid",
}

//all fields are required