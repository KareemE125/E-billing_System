import { Injectable } from '@angular/core';
import { User } from '../models/users/user.model';
import { Subject } from 'rxjs';
import { dummy_users } from '../dummy-data/user-list';

@Injectable({
  providedIn: 'root'
})
//this service is responsible signing in and singing up

export class AccountService {

  currentUserType: UserType = UserType.User;
GetUsersEnum():any {
  return UserType;
}
  // usersList: User[] = [];
  // messageTobeSent = new Subject<String>();

  constructor() { }


  // getUsers(): User[] {
  //   this.usersList = dummy_users
  //   return this.usersList
  // }


  // sendMessage(message: String) {
  //   return this.messageTobeSent.next(message);
  // }


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

  enum UserType {
  Admin,
  User,
  ServiceProvider
}
