import { Injectable } from "@angular/core";
import { User } from "../../models/users/user.model";
import { WaterBill } from "../../models/bills/water.model";
import { TelephoneBill } from "../../models/bills/telephone.model";
import { ElectricityBill } from "../../models/bills/electricity.model";
import { UserService } from "./user.service";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
@Injectable({
  providedIn: "root",
})
export class WaterBillService {
  private dbPath = "/users";
  userCollection: AngularFirestoreCollection<User>;
  private userService: UserService;

  constructor(private db: AngularFirestore, userService: UserService) {
    this.userCollection = this.db.collection(this.dbPath);
    this.userService = userService;
  }

  async addWaterBillToUser(userId: string, waterBill: WaterBill): Promise<any> {
    console.log("Adding water bills to user: ", userId);
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
        user.waterBills.push(waterBill);
        return this.userService.updateUser(user);
      }
    } catch (error) {
      console.log("Error adding water bill to user:", error);
    }
  }



  async updateWaterBill(userId: string, waterBill: WaterBill): Promise<any> {
    console.log("Updating water bill: ", waterBill);
    try {
      const user: User = await this.userService.getUserById(userId);
      if (user) {
        const index = user.waterBills.findIndex((wb) => wb.id === waterBill.id);
        user.waterBills[index] = waterBill;
        return this.userService.updateUser(user);
      }
    } catch (error) {
      console.log("Error updating water bill:", error);
    }
  }




  async getAllWaterBills(): Promise<WaterBill[] | null> {
    console.log("Getting all water bills...");
    try {
      const users = await this.userService.getAllUsers();
      if (users !== null && users.length > 0) {
        const waterBills: WaterBill[] = [];
        users.forEach((user) => {
          waterBills.push(...user.waterBills);
        });
        return waterBills;
      }
      return null;
    } catch (error) {
      console.log("Error getting all water bills:", error);
      return null;
    }
  }

}
