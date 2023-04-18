import { Injectable } from '@angular/core';
import { User } from '../../models/users/user.model';
import { Subject } from 'rxjs';
import { dummy_users } from '../../dummy-data/user-list';
import { CommonUser } from '../../models/users/common.model';

@Injectable({
  providedIn: 'root'
})
//this service is responsible signing in and singing up

export class AccountService {

  currentUserType?: UserType = undefined;
  currentUser?: CommonUser = undefined;

  GetUsersEnum(): any {
    return UserType;
  }

  //adminService, serviceProviderService, and userService are all responsible
  //for setting the current user, or logging him out entirely
  SetCurrentUser(usr: CommonUser, usrType: UserType): void {
    this.currentUser = usr
    this.currentUserType = usrType
  }


  constructor() { }


  // usersList: User[] = [];
  // messageTobeSent = new Subject<String>();

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
