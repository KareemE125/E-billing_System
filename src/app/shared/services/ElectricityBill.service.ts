import { Injectable } from "@angular/core";
import { User } from "../models/users/user.model";
import { ElectricityBill } from "../models/bills/electricity.model";
import { UserService } from "./user.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { DataService } from "./BillService.service";
import * as uuid from 'uuid';

@Injectable({
  providedIn: "root",
})
export class ElectricityBillService extends DataService {


  constructor(db: AngularFirestore, private userService: UserService) {
    super(db);
  }


  /**
   * @param userId
   * @param electricityBill
   * @returns the user if the electricity bill was added to the user, false if the user was not found, null if there was an error
   */
  async addElectricityBillToUser(userId: string, electricityBill: ElectricityBill): Promise<null | false | User> {
    console.log("Adding electricity bills to user: ", userId);
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
        electricityBill.id = uuid.v4()
        user.electricityBills.push(electricityBill);
        await this.userService.updateUser(user);
      }
      return user;
    } catch (error) {
      console.error("Error adding electricity bill to user:", error);
      return null;
    }
  }

  /**
   * 
   * @param userId 
   * @param electricityBills
   * @returns  the user if the electricity bills were updated, false if the user was not found, null if there was an error
   */
  async updateElectricityBills(userId: string, electricityBills: ElectricityBill[]): Promise<User | false | null> {
    console.log("Updating electricity bills: ", electricityBills);
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
        for (let bill of electricityBills) {
          const index = user.electricityBills.findIndex((eb) => eb.id === bill.id);
          if (index === -1) {
            console.error("electricity bill " + bill.id + " not found");
            continue
          }
          user.electricityBills[index] = bill;
        }

        await this.userService.updateUser(user);
      }
      return user;
    } catch (error) {
      console.log("Error updating electricity bills:", error);
      return null;
    }
  }


  /**
   * 
   * @returns all the electricity bills in the database, false if no users ,null if there was an error
   */
  async getAllElectricityBills(): Promise<ElectricityBill[] | null | false> {
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
      return false;
    } catch (error) {
      console.error("Error getting all electricity bills:", error);
      return null;
    }
  }


  async getUserElectricityBillsById(userId: string): Promise<ElectricityBill[] | null | false> {
    console.log("Getting getUserElectricityBills...");
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
        return user.electricityBills;
      }
      return false;
    } catch (error) {
      console.error("Error getting user electricity bills:", error);
      return null;
    }
  }


}
