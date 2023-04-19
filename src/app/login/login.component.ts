import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorsService } from '../shared/services/errors.service';
import { UserService } from '../shared/services/user.service';
import { WaterBillService } from '../shared/services/WaterBill.service';
import { User } from '../models/users/user.model';
import { AdminService } from '../shared/services/admin.service';
import { ServiceProviderService } from '../shared/services/service-provider.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  loginForm: FormGroup;


  errs: any;

  constructor(private errService: ErrorsService, private formBuilder: FormBuilder, private router: Router, private userService: UserService,
    private adminService: AdminService, private srvProvService: ServiceProviderService, private waterBillService: WaterBillService) {
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
      const user = await this.userService.validateUser(this.email?.value, this.password?.value);
      const admin = await this.adminService.validateAdmin(this.email?.value, this.password?.value);
      const serviceProvider = await this.srvProvService.validateServiceProvider(this.email?.value, this.password?.value);

      if (user == null || admin == null || serviceProvider == null) {
        //no internet
        //todo show a toast
      } else if (user) {
        this.router.navigate(['home'])
      } else if (admin) {
        this.router.navigate(['manage'])
      } else if (serviceProvider) {
        this.router.navigate(['addoffer'])
      } else {
        //todo: show a toast: invalid credentials
        console.log("invalid credentials");
      }

    } else {

      this.loginForm.markAllAsTouched();
    }
  }

}
