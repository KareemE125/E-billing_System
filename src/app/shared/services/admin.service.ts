import { Injectable } from '@angular/core';
import { Admin } from '../../models/users/admin.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  //Todo: add admin to firebase
  addAdmin(admin: Admin) {
    console.log(`Adding admin ${JSON.stringify(admin)} to firebase`)
  }

  updateAdmin(admin: Admin) {
    console.log(`Updating admin ${JSON.stringify(admin)} to firebase`)
  }
}
