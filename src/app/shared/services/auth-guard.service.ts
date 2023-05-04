import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private accService: AccountService) { }

  canActivate() {
    console.log(this.accService.isLoggedIn());
    return this.accService.isLoggedIn();
  }
}
