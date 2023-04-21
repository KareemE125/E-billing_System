import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/services/account.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isLoggedIn: boolean = true

  constructor(public accountService: AccountService) {
    this.accountService.loggedInSubject.subscribe(val =>
      this.isLoggedIn = val)
  }

  logout(): void {
    this.accountService.logout()
  }

  goToHome(): void {
    this.accountService.goToHome()
  }
}

