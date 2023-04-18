import { Component } from '@angular/core';
import { AccountService } from '../shared/services/account.service'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isLoggedIn: boolean = true

  constructor(public accountService: AccountService) { }
}

