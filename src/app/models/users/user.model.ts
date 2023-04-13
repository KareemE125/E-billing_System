import { ElectricityBill } from "../bills/electricity.model";
import { TelephoneBill } from "../bills/telephone.model";
import { WaterBill } from "../bills/water.model";
import { Common } from "./common.model";

export interface User extends Common {
    waterBills: WaterBill[],
    telephoneBills: TelephoneBill[],
    electrictyBills: ElectricityBill[]
}
