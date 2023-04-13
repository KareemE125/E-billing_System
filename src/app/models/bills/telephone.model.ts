import { ServiceProvider } from "../users/serviceProvider.model";
import { CommonBill } from "./commonBill.model";

export interface TelephoneBill extends CommonBill {
    serviceProvider: ServiceProvider,
    offerName: string
}