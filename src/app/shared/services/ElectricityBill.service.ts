import { Injectable } from "@angular/core";
import { User } from "../../models/users/user.model";
import { ElectricityBill } from "../../models/bills/electricity.model";
import { UserService } from "./user.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { DataService } from "./BillService.service";
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
  async addElectricityBillToUser(userId: string, electricityBill: ElectricityBill ): Promise<null| false | User> {
    console.log("Adding electricity bills to user: ", userId);
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
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
   * @param electricityBill 
   * @returns  the user if the electricity bill was updated, false if the user was not found, null if there was an error
   */
  async updateElectricityBill( userId: string, electricityBill: ElectricityBill): Promise<User | false | null> {
    console.log("Updating electricity bill: ", electricityBill);
    try {
      const user= await this.userService.getUserById(userId);
      if (user) {
        const index = user.electricityBills.findIndex((eb) => eb.id === electricityBill.id);
        if(index === -1){ 
          console.error("electricity bill not found");
          return null;
        }
        user.electricityBills[index] = electricityBill;
        await this.userService.updateUser(user);
      }
      return user;
    } catch (error) {
      console.log("Error updating electricity bill:", error);
      return null;
    }
  }


  /**
   * 
   * @returns all the electricity bills in the database, false if no users ,null if there was an error
   */
  async getAllElectricityBills(): Promise<ElectricityBill[] | null| false> {
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
      console.error("Error getting all telephone bills:", error);
      return null;
    }
  }
}
