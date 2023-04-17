import { Injectable } from '@angular/core';
import { User } from '../models/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  //Todo: add user to firebase
  addUser(user: User) {
    console.log(`Adding user ${JSON.stringify(user)} to firebase`)
  }
  updateUser(user: User) {
    console.log(`Updating user ${JSON.stringify(user)} to firebase`)
  }
}
