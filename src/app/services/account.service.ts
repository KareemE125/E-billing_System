import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  usersList: User[] = [];
  messageTobeSent = new Subject<String>();

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


  sendMessage(message: String) {
    return this.messageTobeSent.next(message);
  }
}
