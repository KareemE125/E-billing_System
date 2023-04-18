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

  constructor(private db: AngularFirestore) {
    this.userCollection = this.db.collection(this.dbPath)
  }

  addUser(user: User): any {
    const newDocRef = this.userCollection.doc()
    user.id = newDocRef.ref.id

    newDocRef.set({ ...user }).then(async () => {
      console.log('User added to firebase: ', user)
      return user;
    });

  }

  updateUser(user: User): Promise<void> {
    console.log(`Updating user ${JSON.stringify(user)} to firebase`)
    return this.userCollection.doc(user.id).update(user)
  }

  deleteUser(id: string): Promise<void> {
    return this.userCollection.doc(id).delete()
  }


  async getAllUsers(): Promise<User[] | null> {
    console.log('Getting all users...');
    try {
      const querySnapshot = await this.userCollection.get().toPromise();
      const users: User[] = [];

      if (querySnapshot !== undefined) {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            console.log('User data:', doc.data());
            users.push(doc.data() as User);
          } else {
            console.log('No such document!');
          }
        });
      }

      return users;
    } catch (error) {
      console.log('Error getting users:', error);
      return null;
    }
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

  async validateUser(email: string, password:string): Promise<User | false> {
    try {
      const user=await this.getUserByEmail(email);
      if(user != false && user.password === password){
          console.log("user is found and password is correct");
          return user;
      }
      return false;
    }
    catch (error) {
      console.log('Error getting user:', error);
      return false;
    }
  }

  async getUserByEmail(email: string):Promise<User | false> {
    console.log('Getting user by email: ', email);
    try {
      const querySnapshot = await this.userCollection.ref.where('email', '==', email).get();
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        console.log("User is found")
        console.log('User data:', userDoc.data());
        return userDoc.data() as User;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
