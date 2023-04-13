import { ElectricityBill } from "../bills/electricity.model";
import { TelephoneBill } from "../bills/telephone.model";
import { WaterBill } from "../bills/water.model";
import { CommonUser } from "./common.model";

export interface User extends CommonUser {
    waterBills: WaterBill[],
    telephoneBills: TelephoneBill[],
    electrictyBills: ElectricityBill[]
}
