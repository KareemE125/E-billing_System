import { Injectable } from '@angular/core'
import { User } from '../../models/users/user.model'
import { WaterBill } from '../../models/bills/water.model'
import { TelephoneBill } from '../../models/bills/telephone.model'
import { ElectricityBill } from '../../models/bills/electricity.model'
import { UserService } from './user.service'
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore'
@Injectable({
  providedIn: 'root'
})

export class BillService {
  private dbPath = '/users'
  userCollection: AngularFirestoreCollection<User>
  private userService: UserService;

  constructor (private db: AngularFirestore, userService: UserService) {
    this.userCollection = this.db.collection(this.dbPath)
    this.userService= userService;
  }

  async addWaterBillToUser(userId: string, waterBill: WaterBill): Promise<any> {
    console.log('Adding water bills to user: ', userId);
    try {
      const user= await this.userService.getUserById(userId);
      if (user) {
        user.waterBills.push(waterBill);
        return this.userService.updateUser(user);
      }
    } catch (error) {
      console.log('Error adding water bill to user:', error);
    }
  }

  async addTelephoneBillToUser(userId: string, telephoneBill: WaterBill): Promise<any> {
    console.log('Adding telephone bills to user: ', userId);
    try {
      const user= await this.userService.getUserById(userId);
      if (user) {
        user.telephoneBills.push(telephoneBill);
        return this.userService.updateUser(user);
      }
    } catch (error) {
      console.log('Error adding telephone bill to user:', error);
    }
  }

  async addElectricityBillToUser(userId: string, electricityBill: WaterBill): Promise<any> {
    console.log('Adding electricity bills to user: ', userId);
    try {
      const user= await this.userService.getUserById(userId);
      if (user) {
        user.electricityBills.push(electricityBill);
        return this.userService.updateUser(user);
      }
    } catch (error) {
      console.log('Error adding electricity bill to user:', error);
    }
  }
  
  async updateWaterBill(userId: string, waterBill: WaterBill): Promise<any> {
    console.log('Updating water bill: ', waterBill);
    try {
      const user:User= await this.userService.getUserById(userId);
      if (user) {
        const index= user.waterBills.findIndex(wb => wb.id === waterBill.id);
        user.waterBills[index]= waterBill;
        return this.userService.updateUser(user);
      }
    } catch (error) {
      console.log('Error updating water bill:', error);
    }
  }

  async updateTelephoneBill(userId: string, telephoneBill:TelephoneBill): Promise<any> {
    console.log('Updating telephone bill: ', telephoneBill);
    try {
      const user:User= await this.userService.getUserById(userId);
      if (user) {
        const index= user.telephoneBills.findIndex(tb => tb.id === telephoneBill.id);
        user.telephoneBills[index]= telephoneBill;
        return this.userService.updateUser(user);
      }
    } catch (error) {
      console.log('Error updating telephone bill:', error);
    }
  }

  async updateElectricityBill(userId: string, electricityBill: ElectricityBill): Promise<any> {
    console.log('Updating electricity bill: ', electricityBill);
    try {
      const user:User= await this.userService.getUserById(userId);
      if (user) {
        const index= user.electricityBills.findIndex(eb => eb.id === electricityBill.id);
        user.electricityBills[index]= electricityBill;
        return this.userService.updateUser(user);
      }
    } catch (error) {
      console.log('Error updating electricity bill:', error);
    }
  }
  
}