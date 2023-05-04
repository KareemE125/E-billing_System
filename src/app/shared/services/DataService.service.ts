import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/compat/firestore'
import { User } from '../models/users/user.model'
import { Injectable } from '@angular/core'
import { ElectricityBillService } from './ElectricityBill.service'
import { AccountService } from './account.service'
import { BehaviorSubject } from 'rxjs'
import { TelephoneBill } from '../models/bills/telephone.model'
import { UserType } from '../models/users/common.model'
import { ElectricityBill } from '../models/bills/electricity.model'
import { WaterBill } from '../models/bills/water.model'
import { ServiceProvider } from '../models/users/serviceProvider.model'
import { Admin } from '../models/users/admin.model'

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {
  userCollection: AngularFirestoreCollection<User>;
  serviceProvidersCollection: AngularFirestoreCollection<ServiceProvider>;
  adminCollection: AngularFirestoreCollection<Admin>;




  constructor(private db: AngularFirestore) {
    this.userCollection = this.db.collection('/users');
    this.serviceProvidersCollection = this.db.collection('/service-providers');
    this.adminCollection = this.db.collection('/admins');




    // //when any change happens to the current user, share it to the accService
    // this.accService.currentUserSubject.subscribe(
    //   curUser => {
    //     console.log("change in the current user subject, ", curUser);

    //     this.userCollection.doc(curUser?.id).valueChanges().subscribe(
    //       e => e ? this.accService.SetCurrentUser(e, this.accService.currentUserType) : null
    //     )

    //   })
  }
}