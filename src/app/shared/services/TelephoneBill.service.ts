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
import { DataService } from "./BillService.service";
@Injectable({
    providedIn: "root",
})
export class TelephoneBillService extends DataService {
    private dbPath = "/users";
    userCollection: AngularFirestoreCollection<User>;
    private userService: UserService;

    constructor(private db: AngularFirestore, userService: UserService) {
        this.userCollection = this.db.collection(this.dbPath);
        this.userService = userService;
    }
    async addTelephoneBillToUser(userId: string, telephoneBill: WaterBill): Promise<any> {
        console.log("Adding telephone bills to user: ", userId);
        try {
            const user = await this.userService.getUserById(userId);
            if (user) {
                user.telephoneBills.push(telephoneBill);
                return this.userService.updateUser(user);
            }
        } catch (error) {
            console.log("Error adding telephone bill to user:", error);
        }
    }

    async updateTelephoneBill(userId: string, telephoneBill: TelephoneBill): Promise<any> {
        console.log("Updating telephone bill: ", telephoneBill);
        try {
            const user: User = await this.userService.getUserById(userId);
            if (user) {
                const index = user.telephoneBills.findIndex(
                    (tb) => tb.id === telephoneBill.id
                );
                user.telephoneBills[index] = telephoneBill;
                return this.userService.updateUser(user);
            }
        } catch (error) {
            console.log("Error updating telephone bill:", error);
        }
    }

    async getAllTelephoneBills(): Promise<TelephoneBill[] | null> {
        console.log("Getting all telephone bills...");
        try {
            const users = await this.userService.getAllUsers();
            if (users !== null && users.length > 0) {
                const telephoneBills: TelephoneBill[] = [];
                users.forEach((user) => {
                    telephoneBills.push(...user.telephoneBills);
                });
                return telephoneBills;
            }
            return null;
        } catch (error) {
            console.log("Error getting all telephone bills:", error);
            return null;
        }
    }
}
