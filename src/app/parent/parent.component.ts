import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})

export class ParentComponent {
  userList: User[] = [];

  messageToShow: String = '';

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.userList = this.accountService.getUsers()

    this.accountService.messageTobeSent.subscribe((msg) => {
      this.messageToShow = msg;
    });
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
