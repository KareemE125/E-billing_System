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


/////// >>>>> User get using firebase example <<<<< /////////////////

  // userAddedSubject = new Subject<string>();

  // addUserToFirestore(user: any): void {
  //   firebase.firestore().collection('users').add(user)
  //     .then((docRef) => {
  //       console.log("Document written with ID: ", docRef.id);
  //       return this.userAddedSubject.next(docRef.id);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding document: ", error);
  //     });
  // }
  
/////////////////////////////////////////////////////////////////////

}
