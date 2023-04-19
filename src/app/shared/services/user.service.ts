import { Injectable } from '@angular/core'
import { User } from '../../models/users/user.model'
import {  AngularFirestore} from '@angular/fire/compat/firestore'
import { UserType, AccountService } from './account.service'
import { DataService } from './BillService.service'

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService{

  constructor(db: AngularFirestore, private accountService: AccountService) {
    super(db);
    this.accountService = accountService;
  }

  /**
   * @param user 
   * @returns user if added successfully, null otherwise
   */
  async addUser(user: User): Promise< User | null> {
    const newDocRef = this.userCollection.doc()
    user.id = newDocRef.ref.id
    newDocRef.set({ ...user }).then(() => {
      console.log('User added to firebase: ', user)
      return user;
    }).catch((error) => {
      console.error('Error adding user to firebase: ', error);
      return null;
    });

    return null;
  }

  /**
   * @param user
   * @returns true if user is updated successfully, null otherwise
   */
  async updateUser(user: User): Promise<null | true>{
    try{
      console.log(`Updating user ${JSON.stringify(user)} to firebase`)
      await this.userCollection.doc(user.id).update(user);
      return true;
    }
    catch(error){
      console.error('Error updating user: ', error);
      return null;
    }
  }

  /**
   * @param id (user id) 
   * @returns true if user is deleted successfully, null otherwise
   */
  async deleteUser(id: string): Promise<null | true> {
   try {
      await this.userCollection.doc(id).delete();
      return true;
    } catch (error) {
      console.error('Error deleting user: ', error);
      return null;
    }
  }


  /**
   * 
   * @returns all users if found, null otherwise
   */
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


  /**
   * @param id (user id)
   * @returns user if found, false if not found, null otherwise
   */
  async getUserById(id: string): Promise<User | null | false> {
    console.log('Getting user by id: ', id);
    try {
      const userDoc = await this.userCollection.doc(id).get().toPromise();
      if (userDoc && userDoc.exists) {
        console.log("User is found")
        console.log('User data:', userDoc.data());
        return userDoc.data() as User;
      } else {
        console.log('No such document!');
        return false;
      }
    } catch (error) {
      console.log('Error getting user:', error);
      return null;
    }
  }

  /**
   * @param email
   * @param password
   * @returns user if found, false if not found, null otherwise
   */
  async validateUser(email: string, password:string): Promise<User | null | false> {
    try {
      const user=await this.getUserByEmail(email);
      if(user != null && user != false && user.password === password){
          console.log("user is found and password is correct");
          this.accountService.SetCurrentUser(user,UserType.User);
          return user as User;
      }
      return false;
    }
    catch (error) {
      console.log('Error getting user:', error);
      return null;
    }
  }

  /**
   * @param email
   * @returns user if found, false if not found, null otherwise
   */
  async getUserByEmail(email: string):Promise<User | null | false> {
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
      return null;
    }
  }
}
