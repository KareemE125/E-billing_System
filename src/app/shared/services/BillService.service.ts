import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/compat/firestore'
import { User } from '../../models/users/user.model'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export abstract class BillService {
  userCollection: AngularFirestoreCollection<User>

  constructor (private db: AngularFirestore) {
    this.userCollection = this.db.collection('/users')
  }
}
