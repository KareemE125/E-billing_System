import { Injectable } from '@angular/core';
import { User } from '../../models/users/user.model';
import { Subject } from 'rxjs';
import { dummy_users } from '../../dummy-data/user-list';
import { CommonUser, UserType } from '../../models/users/common.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
//this service is responsible signing in and singing up

export class AccountService {

  loggedInSubject: Subject<boolean> = new Subject<boolean>() //for the subscribers
  currentUserSubject: Subject<CommonUser> = new Subject<CommonUser>() //for the subscribers

  currentUserType?: UserType = undefined;
  currentUser?: CommonUser = undefined;

  // currentUserType?: UserType = UserType.User;
  // currentUser?: CommonUser = {
  //   id: "", //auto generated
  //   name: "",   //required
  //   email: "",  //required
  //   phoneNumber: "",    //required
  //   password: "",       //required
  //   address: null   //not required
  // };

  constructor(private router: Router) {
    const usr: any = JSON.parse(localStorage.getItem("user") ?? "{}")
    if (usr)
      this.SetCurrentUser(usr.user, usr.userType)

  }

  private _setLoginState(isLogged: boolean) {
    this.loggedInSubject.next(isLogged)
  }
  private _setCurrentUserSubject(usr: CommonUser) {
    this.currentUserSubject.next(usr)
  }

  //adminService, serviceProviderService, and userService are all responsible
  //for setting the current user, or logging him out entirely
  SetCurrentUser(usr: CommonUser | undefined, usrType: UserType | undefined): void {
    this.currentUser = usr
    this.currentUserType = usrType

    console.log("call to set current user with type: ", usrType, " and data: ", usr);

    if (usr === undefined && usrType === undefined) {
      this._setLoginState(false)
    }
    else {
      this._setCurrentUserSubject(usr!)
      this._setLoginState(true)
      localStorage.setItem("user", JSON.stringify({ userType: usrType, user: usr }))
    }
  }

  logout(): void {
    this.SetCurrentUser(undefined, undefined);
    this.router.navigate(['/login'])
    localStorage.removeItem("user")
  }

  isLoggedIn(): boolean {   //for the normal methods
    return this.currentUserType !== undefined
  }

  goToHome(): void {
    console.log("go to home " + this.currentUserType);
    if (!this.isLoggedIn())
      this.router.navigate(['/login'])
    else if (this.currentUserType === this.GetUsersEnum().User)
      this.router.navigate(['/home'])
    else if (this.currentUserType === this.GetUsersEnum().Admin)
      this.router.navigate(['/admin-manage'])
    else if (this.currentUserType === this.GetUsersEnum().ServiceProvider)
      this.router.navigate(['/sp-home'])
  }



  GetUsersEnum(): any {
    return UserType;
  }
  getPendingElectricityPayments(): number {
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

    return this.getPendingElectricityPayments() +
      this.getPendingTelephonePayments() +
      this.getPendingWaterPayments();
  }

}

