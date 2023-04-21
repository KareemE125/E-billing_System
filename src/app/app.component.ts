import { Component, Injectable, OnInit } from '@angular/core';
import { AccountService } from './shared/services/account.service';
import { User } from './models/users/user.model';
import { DbService } from './shared/services/db.service';
import { ToastService } from './shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private accService: AccountService) { }


  ngOnInit(): void {
    //if (this.accService.currentUser)
    this.router.navigate(['home'])
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
