import { Injectable } from "@angular/core";
import { User } from "../models/users/user.model";
import { WaterBill } from "../models/bills/water.model";
import { UserService } from "./user.service";
import { AngularFirestore, AngularFirestoreCollection, } from "@angular/fire/compat/firestore";
import { DataService } from "./BillService.service";
import * as uuid from 'uuid';

@Injectable({
  providedIn: "root",
})
export class WaterBillService extends DataService {


  constructor(db: AngularFirestore, private userService: UserService) {
    super(db);
  }
  /**
   * @param userId 
   * @param waterBill 
   * @returns true if water bill was added to user, false if user not found, null if error
   */
  async addWaterBillToUser(userId: string, waterBill: WaterBill): Promise<null | false | User> {
    console.log("Adding water bills to user: ", userId);
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
        waterBill.id = uuid.v4()
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
   * @param waterBills 
   * @returns true if water bills were updated, false if user not found, null if error
   */
  async updateWaterBills(userId: string, waterBills: WaterBill[]): Promise<User | false | null> {
    console.log("Updating water bills: ", waterBills);
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {

        for (let bill of waterBills) {
          const index = user.waterBills.findIndex((wb) => wb.id === bill.id);
          if (index === -1) {
            console.error("Water bill not found");
            continue
          }
          user.waterBills[index] = bill;
        }
        await this.userService.updateUser(user);
      }
      return user;
    } catch (error) {
      console.error("Error updating water bills:", error);
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
          if (user.waterBills)
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

  /**
   * 
   * @returns all the user electricity bills in the database, false if no users ,null if there was an error
   */
  async getAUserWaterBillsById(userId: string): Promise<WaterBill[] | null | false> {
    console.log("Getting getAUserWaterBillsById...");
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
        return user.waterBills;
      }
      return false;
    } catch (error) {
      console.error("Error getting user water bills:", error);
      return null;
    }
  }
}
