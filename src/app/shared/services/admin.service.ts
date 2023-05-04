import { Injectable } from '@angular/core';
import { Admin } from '../models/users/admin.model';
import { DataService } from './DataService.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'
@Injectable({
  providedIn: 'root'
})
export class AdminService extends DataService {

  constructor(db: AngularFirestore) {
    super(db);
  }
  async addAdmin(admin: Admin): Promise<Admin | null> {
    const newDocRef = this.adminCollection.doc();
    admin.id = newDocRef.ref.id;
    try {
      await newDocRef.set({ ...admin });
      console.log('Admin added to firebase: ', admin)
      return admin;
    } catch (error) {
      console.error('Error adding admin to firebase: ', error);
      return null;
    }
  }

  async updateAdmin(admin: Admin): Promise<null | true> {
    try {
      console.log(`Updating admin ${JSON.stringify(admin)} to firebase`)
      await this.adminCollection.doc(admin.id).update(admin);
      return true;
    }
    catch (error) {
      console.error('Error updating admin: ', error);
      return null;
    }
  }

  /**
 * @param email
 * @param password
 * @returns Admin if found, false if not found, null otherwise
 */
  async validateAdmin(email: string, password: string): Promise<Admin | null | false> {
    try {
      const admin = await this.getAdminByEmail(email);
      if (admin != null && admin != false && admin.password === password) {
        console.log("user is found and password is correct");
        return admin as Admin;
      }
      return false;
    }
    catch (error) {
      console.log('Error getting user:', error);
      return null;
    }
  }

  async getAdminByEmail(email: string): Promise<Admin | null | false> {
    console.log('Getting admin by email: ', email);
    try {
      const querySnapshot = await this.adminCollection.ref.where('email', '==', email).get();
      if (!querySnapshot.empty) {
        const adminDoc = querySnapshot.docs[0];
        console.log("User is found with email: ", email)
        return adminDoc.data() as Admin;
      } else {
        return false;
      }
    } catch (error) {
      return null;
    }
  }
}
