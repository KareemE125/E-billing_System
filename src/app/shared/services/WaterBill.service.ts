import { Injectable } from "@angular/core";
import { User } from "../../models/users/user.model";
import { WaterBill } from "../../models/bills/water.model";
import { UserService } from "./user.service";
import { AngularFirestore, AngularFirestoreCollection,} from "@angular/fire/compat/firestore";
import { DataService } from "./BillService.service";
@Injectable({
  providedIn: "root",
})
export class WaterBillService extends DataService{


    constructor(db: AngularFirestore, private userService: UserService) {
        super(db);
    }
  /**
   * @param userId 
   * @param waterBill 
   * @returns true if water bill was added to user, false if user not found, null if error
   */
  async addWaterBillToUser(userId: string, waterBill: WaterBill): Promise<null| false | User> {
    console.log("Adding water bills to user: ", userId);
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
        user.waterBills.push(waterBill);
        await this.userService.updateUser(user);
      }
      return user;
    } catch (error) {
      console.error("Error adding water bill to user:", error);
      return null;
    }
  }

  /**
   * @param userId 
   * @param waterBill 
   * @returns true if water bill was deleted from user, false if user not found, null if error
   */
  async updateWaterBill(userId: string, waterBill: WaterBill): Promise<User | false | null> {
    console.log("Updating water bill: ", waterBill);
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
        const index = user.waterBills.findIndex((wb) => wb.id === waterBill.id);
        if(index === -1){ 
          console.error("Water bill not found");
          return null;
        }
        user.waterBills[index] = waterBill;
        await this.userService.updateUser(user);
      }
      return user;
    } catch (error) {
      console.error("Error updating water bill:", error);
      return null;
    }
  }

  /**
   * @returns all water bills, false if no users, null if error
   */
  async getAllWaterBills(): Promise<WaterBill[] | null | false> {
    console.log("Getting all water bills...");
    try {
      const users = await this.userService.getAllUsers();
      if (users !== null && users.length > 0) {
        const waterBills: WaterBill[] = [];
        users.forEach((user) => {
          if(user.waterBills)
            waterBills.push(...user.waterBills);
        });
        return waterBills;
      }
      return false;
    } catch (error) {
      console.log("Error getting all water bills:", error);
      return null;
    }
  }
}
