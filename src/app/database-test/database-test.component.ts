import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../models/users/user.model'
@Component({
  selector: 'app-database-test',
  templateUrl: './database-test.component.html',
  styleUrls: ['./database-test.component.css']
})
export class DatabaseTestComponent {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
    
    this.testCreateUser();
  }
    
  
  //test create user 
  async testCreateUser() {
    const user :User= {
      id:'',
      name: 'test',
      email: 'test@gmail.com',
      password: 'Test12345',
      wallet: 0,
      waterBills: [],
      telephoneBills: [],
      electricityBills: [],
      phoneNumber: '1234567890',
      address: null
    }
    const newUser = await this.userService.addUser(user);
    console.log('New user created: ', newUser);
  }

}
