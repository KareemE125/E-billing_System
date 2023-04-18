import { Injectable } from '@angular/core'
import { User } from '../../models/users/user.model'
import { WaterBill } from '../../models/bills/water.model'
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = '/users'
  userCollection: AngularFirestoreCollection<User>

  constructor (private db: AngularFirestore) {
    this.userCollection = this.db.collection(this.dbPath)
  }

  addUser (user: User): any {
    const newDocRef = this.userCollection.doc()
    user.id = newDocRef.ref.id

    newDocRef.set({ ...user }).then(async () => {
      console.log('User added to firebase: ',user)
      return user;
    });

  }

  updateUser (user: User): Promise<void> {
    console.log(`Updating user ${JSON.stringify(user)} to firebase`)
    return this.userCollection.doc(user.id).update(user)
  }

  deleteUser (id: string): Promise<void> {
    return this.userCollection.doc(id).delete()
  }


  getAll(): AngularFirestoreCollection<User> {
    return this.userCollection;
  }

  async getUserById(id: string): Promise<any> {
    console.log('Getting user by id: ', id);
    try {
      const userDoc = await this.userCollection.doc(id).get().toPromise();
      if (userDoc && userDoc.exists) {
        console.log("User is found")
        console.log('User data:', userDoc.data());
        return userDoc.data() as User;
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.log('Error getting user:', error);
    }
  }

  
}
