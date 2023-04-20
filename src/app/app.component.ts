import { Component, Injectable, OnInit } from '@angular/core';
import { AccountService } from './shared/services/account.service';
import { User } from './models/users/user.model';
import { DbService } from './shared/services/db.service';
import { ToastService } from './shared/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'E-Billing_System';
  constructor(private db: DbService, private toastService: ToastService) { }

  triggerToast(isSuccess: boolean, title: string, message: string) {
    this.toastService.showToast(isSuccess, title, message)
  }

  ngOnInit(): void {
  }


  /////// >>>>> User get using firebase example <<<<< /////////////////


  // addUser(): void {
  //   const user = {
  //     name: 'John Doe',
  //     email: 'john@example.com'
  //   };
  //   this.userService.addUserToFirestore(user);
  //   this.userService.userAddedSubject.subscribe((id) => {
  //     console.log(`New user added with ID: ${id}`);
  //   });
  // }

  /////////////////////////////////////////////////////////////////////



}
