import { ServiceProvider } from "../users/serviceProvider.model";
import { CommonBill } from "./commonBill.model";

export interface TelephoneBill extends CommonBill {
    serviceProviderName: string | "-",
    offerName: string | "-",
    offerUnits: number | null
}

//all fields are required