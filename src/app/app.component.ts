import { Component, Injectable, OnInit } from '@angular/core';
import { AccountService } from './account.service';
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

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.userList = this.accountService.getUsers()
  }


}
