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
export class ElectricityBillService {
  private dbPath = "/users";
  userCollection: AngularFirestoreCollection<User>;
  private userService: UserService;

  constructor(private db: AngularFirestore, userService: UserService) {
    this.userCollection = this.db.collection(this.dbPath);
    this.userService = userService;
  }

  async addElectricityBillToUser(
    userId: string,
    electricityBill: WaterBill
  ): Promise<any> {
    console.log("Adding electricity bills to user: ", userId);
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
        user.electricityBills.push(electricityBill);
        return this.userService.updateUser(user);
      }
    } catch (error) {
      console.log("Error adding electricity bill to user:", error);
    }
  }

  async updateElectricityBill(
    userId: string,
    electricityBill: ElectricityBill
  ): Promise<any> {
    console.log("Updating electricity bill: ", electricityBill);
    try {
      const user: User = await this.userService.getUserById(userId);
      if (user) {
        const index = user.electricityBills.findIndex(
          (eb) => eb.id === electricityBill.id
        );
        user.electricityBills[index] = electricityBill;
        return this.userService.updateUser(user);
      }
    } catch (error) {
      console.log("Error updating electricity bill:", error);
    }
  }

  async getAllElectricityBills(): Promise<ElectricityBill[] | null> {
    console.log("Getting all ElectricityBills...");
    try {
      const users = await this.userService.getAllUsers();
      if (users !== null && users.length > 0) {
        const electricityBills: ElectricityBill[] = [];
        users.forEach((user) => {
          electricityBills.push(...user.electricityBills);
        });
        return electricityBills;
      }
      return null;
    } catch (error) {
      console.log("Error getting all telephone bills:", error);
      return null;
    }
  }
}
