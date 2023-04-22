import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/compat/firestore'
import { User } from '../../models/users/user.model'
import { Injectable } from '@angular/core'
import { ElectricityBillService } from './ElectricityBill.service'
import { ServiceProvider } from 'src/app/models/users/serviceProvider.model'

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {
  userCollection: AngularFirestoreCollection<User>
  servProvCollection: AngularFirestoreCollection<ServiceProvider>
  constructor(private db: AngularFirestore, collectionName: string) {
    this.userCollection = this.db.collection('/users');
    this.servProvCollection = this.db.collection('/service-providers');
  }
}