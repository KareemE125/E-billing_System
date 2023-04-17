import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  message: String = '';
  // constructor(private accountService: AccountService) {}

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }


  sendMessage() {
    //   this.accountService.sendMessage(this.message);
  }
}
