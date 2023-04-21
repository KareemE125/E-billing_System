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

  constructor(public accountService: AccountService, private router: Router) {
    this.accountService.loggedInSubject.subscribe(val =>
      this.isLoggedIn = val)
  }

  logout(): void {
    this.accountService.SetCurrentUser(undefined, undefined);
    this.router.navigate(['/login'])
  }

  goToHome(): void {
    console.log("go to home " + this.accountService.currentUserType);
    if (!this.accountService.isLoggedIn())
      this.router.navigate(['/login'])
    else if (this.accountService.currentUserType === this.accountService.GetUsersEnum().User)
      this.router.navigate(['/home'])
    else if (this.accountService.currentUserType === this.accountService.GetUsersEnum().Admin)
      this.router.navigate(['/admin-manage'])
    else if (this.accountService.currentUserType === this.accountService.GetUsersEnum().ServiceProvider)
      this.router.navigate(['/sp-home'])


  }
}

