import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorsService } from '../shared/services/errors.service';
import { UserService } from '../shared/services/user.service';
import { WaterBillService } from '../shared/services/WaterBill.service';
import {User} from '../models/users/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  loginForm: FormGroup;
  

  errs: any;

  constructor(private errService: ErrorsService, private formBuilder: FormBuilder, private userService: UserService, 
    private waterBillService: WaterBillService) {
    this.errs = errService.getErrors().LoginErrors

    //we keep the validators.email and .pattern even in the sign in form, to prevent a server request if it is guaranteed to fail
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(8), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$')]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      // perform login action
      console.log({
        email: this.email?.value,
        password: this.password?.value
      });
      const user=await this.userService.validateUser(this.email?.value, this.password?.value);
      // if(user != null && user !=false){
      //   const waterBill = {
      //     year: 2023,     
      //     month: 10,      
      //     usage: 100,      
      //     penalty: 0,   
      //     total: 1000,     
      //     isPaid: false,   
      //     id:'2'
      //   };
        // this.waterBillService.addWaterBillToUser(user.id,waterBill);
        console.log(await this.waterBillService.getAllWaterBills());
      
    } else {

      this.loginForm.markAllAsTouched();
    }
  }

}
