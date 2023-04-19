import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/compat/firestore'
import { User } from '../../models/users/user.model'
import { Injectable } from '@angular/core'
import { ElectricityBillService } from './ElectricityBill.service'

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {
  userCollection: AngularFirestoreCollection<User>

  constructor(private db: AngularFirestore) {
    this.userCollection = this.db.collection('/users')
  }
}