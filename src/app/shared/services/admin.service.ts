import { Injectable } from '@angular/core';
import { Admin } from '../../models/users/admin.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  //Todo: add admin to firebase
  async addAdmin(admin: Admin): Promise<Admin | null> {
    console.log(`Adding admin ${JSON.stringify(admin)} to firebase`)
    return null;
  }

  updateAdmin(admin: Admin) {
    console.log(`Updating admin ${JSON.stringify(admin)} to firebase`)
  }

  /**
 * @param email
 * @param password
 * @returns user if found, false if not found, null otherwise
 */
  async validateAdmin(email: string, password: string): Promise<Admin | null | false> {
    // try {
    //   const user = await this.getUserByEmail(email);
    //   if (user != null && user != false && user.password === password) {
    //     console.log("user is found and password is correct");
    //     this.accountService.SetCurrentUser(user, UserType.User);
    //     return user as User;
    //   }
    //   return false;
    // }
    // catch (error) {
    //   console.log('Error getting user:', error);
    //   return null;
    // }
    return false;
  }
}
