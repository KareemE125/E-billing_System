import { Injectable } from "@angular/core";
import { User } from "../../models/users/user.model";
import { TelephoneBill } from "../../models/bills/telephone.model";
import { AngularFirestore} from "@angular/fire/compat/firestore";
import { DataService } from "./BillService.service";
import { UserService } from "./user.service";
@Injectable({
    providedIn: "root",
})
export class TelephoneBillService extends DataService{

    constructor(db: AngularFirestore,private userService: UserService) {
        super(db);
        this.userService = userService;
    }

    /**
     * 
     * @param userId 
     * @param telephoneBill 
     * @returns true if the telephone bill was added to the user, false if the user was not found, null if there was an error
     */
    async addTelephoneBillToUser( userId: string, telephoneBill: TelephoneBill  ):Promise<null| false | User> {
        console.log("Adding telephone bills to user: ", userId);
        try {
            const user = await this.userService.getUserById(userId);
            if (user!= null && user != false) {
                user.telephoneBills.push(telephoneBill);
                await this.userService.updateUser(user);
            }
            return user;
        } catch (error) {
            console.error("Error adding telephone bill to user:", error);
            return null;
        }
    }

    /**
     * 
     * @param userId 
     * @param telephoneBill 
     * @returns true if the telephone bill was updated, false if the user was not found, null if there was an error
     */
    async updateTelephoneBill( userId: string, telephoneBill: TelephoneBill ): Promise<User | false | null>  {
        console.log("Updating telephone bill: ", telephoneBill);
        try {
            const user = await this.userService.getUserById(userId);
            if (user) {
                const index = user.telephoneBills.findIndex((tb) => tb.id === telephoneBill.id);
                user.telephoneBills[index] = telephoneBill;
                if(index === -1){ 
                    console.error("telephone bill not found");
                    return null;
                  }
                await this.userService.updateUser(user);
            }
            return user;
        } catch (error) {
            console.error("Error updating telephone bill:", error);
            return null;
        }
    }

    /**
     * 
     * @param userId
     * @param telephoneBillId
     * @returns all telephone bills, false if no users, null if error
     * 
     */
    async getAllTelephoneBills(): Promise<TelephoneBill[] | null | false> {
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
            return false;
        } catch (error) {
            console.log("Error getting all telephone bills:", error);
            return null;
        }
    }
}
