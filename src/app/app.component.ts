import { Component, Injectable, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './models/users/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'E-Billing_System';

  ngOnInit(): void {
  }


  /////// >>>>> User get using firebase example <<<<< /////////////////

  // constructor(private userService: UserService) {}

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
