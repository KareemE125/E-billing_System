import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorsService } from '../../services/errors.service';
import { UserService } from '../../services/user.service';
import { WaterBillService } from '../../services/WaterBill.service';
import { User } from '../../models/users/user.model';
import { AdminService } from '../../services/admin.service';
import { ServiceProviderService } from '../../services/service-provider.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { AccountService } from '../../services/account.service';
import { UserType } from '../../models/users/common.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  loginForm: FormGroup;


  errs: any;

  constructor(private errService: ErrorsService, private formBuilder: FormBuilder, private router: Router, private userService: UserService,
    private adminService: AdminService, private srvProvService: ServiceProviderService, private waterBillService: WaterBillService,
    private toastService: ToastService, private accountService: AccountService) {
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
        this.toastService.showToast(false, "Unable to connect to the internet", '')
      } else if (user) {
        console.log("User logged in")
        this.accountService.SetCurrentUser(user, UserType.User);
        this.router.navigate(['home'])
      } else if (admin) {
        console.log("Admin logged in")
        this.accountService.SetCurrentUser(admin, UserType.Admin);
        this.router.navigate(['admin-manage'])
      } else if (serviceProvider) {
        console.log("Service Provider logged in")
        this.accountService.SetCurrentUser(serviceProvider, UserType.ServiceProvider);
        this.router.navigate(['sp-home'])
      } else {

        this.toastService.showToast(false, "Invalid credentials", '')
      }

    } else {

      this.loginForm.markAllAsTouched();
    }
  }

}
