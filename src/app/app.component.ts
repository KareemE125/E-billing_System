import { Component, Injectable, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-Billing_System';

  username: string = ""
  password: string = ""

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


}
