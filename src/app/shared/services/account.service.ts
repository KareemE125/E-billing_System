import { Injectable } from '@angular/core';
import { User } from '../../models/users/user.model';
import { Subject } from 'rxjs';
import { dummy_users } from '../../dummy-data/user-list';
import { CommonUser, UserType } from '../../models/users/common.model';

@Injectable({
  providedIn: 'root'
})
//this service is responsible signing in and singing up

export class AccountService {

  loggedInSubject: Subject<boolean> = new Subject<boolean>() //for the subscribers

  // currentUserType?: UserType = undefined;
  // currentUser?: CommonUser = undefined;

  currentUserType?: UserType = UserType.User;
  currentUser?: CommonUser = {
    id: "", //auto generated
    name: "",   //required
    email: "",  //required
    phoneNumber: "",    //required
    password: "",       //required
    address: null   //not required
  };

  _setLoginState(isLogged: boolean) {
    this.loggedInSubject.next(isLogged)
  }

  //adminService, serviceProviderService, and userService are all responsible
  //for setting the current user, or logging him out entirely
  SetCurrentUser(usr: CommonUser | undefined, usrType: UserType | undefined): void {
    this.currentUser = usr
    this.currentUserType = usrType

    if (usr === undefined && usrType === undefined)
      this._setLoginState(false)
  }

  isLoggedIn(): boolean {   //for the normal methods
    return this.currentUserType !== undefined
  }

  GetUsersEnum(): any {
    return UserType;
  }
  getPendingElectrictyPayments(): number {
    let tot: number = 0
    if (this.currentUserType != UserType.User)
      return 0;

    const tmpUser = this.currentUser as User

    for (let bill of tmpUser.electricityBills) {
      if (!bill.isPaid) tot += bill.total
    }
    return tot
  }

  getPendingTelephonePayments(): number {
    let tot: number = 0
    if (this.currentUserType != UserType.User)
      return 0;

    const tmpUser = this.currentUser as User

    for (let bill of tmpUser.telephoneBills) {
      if (!bill.isPaid) tot += bill.total
    }
    return tot
  }

  getPendingWaterPayments(): number {
    let tot: number = 0
    if (this.currentUserType != UserType.User)
      return 0;

    const tmpUser = this.currentUser as User

    for (let bill of tmpUser.waterBills) {
      if (!bill.isPaid) tot += bill.total
    }
    return tot
  }

  getTotalPendingPayments(): number {

    return this.getPendingElectrictyPayments() +
      this.getPendingTelephonePayments() +
      this.getPendingWaterPayments();
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

