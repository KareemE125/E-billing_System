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
  serviceProvidersCollection: AngularFirestoreCollection<ServiceProvider>

  constructor(private db: AngularFirestore) {
    this.userCollection = this.db.collection('/users');
    this.serviceProvidersCollection = this.db.collection('/service-providers');

  }
}