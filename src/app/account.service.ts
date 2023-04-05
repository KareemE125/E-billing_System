import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  usersList: User[] = [];

  constructor() { }


  getUsers() : User[] {
    this.usersList = [
      {
        id: "1001",
        name: "User One"
      },
      {
        id: "1002",
        name: "User Two"
      },
    ]

    return this.usersList
  }
}
