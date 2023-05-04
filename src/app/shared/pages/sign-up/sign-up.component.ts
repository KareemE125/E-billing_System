import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonUser, userTypes } from '../../models/users/common.model';
import { Admin } from '../../models/users/admin.model';
import { User } from '../../models/users/user.model';
import { ErrorsService } from '../../services/errors.service';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';
import { AccountService } from '../../services/account.service';
import { ServiceProvider } from '../../models/users/serviceProvider.model';
import { ServiceProviderService } from '../../services/service-provider.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  userTypesRadioButtons = userTypes; //get the user types for the radio buttons


  errs: any;

  constructor(private errService: ErrorsService, private formBuilder: FormBuilder,
    private userService: UserService, private adminService: AdminService,
    private accService: AccountService, private servProvService: ServiceProviderService,
    private router: Router, private toastService: ToastService) {
    this.errs = errService.getErrors().SignUpErrors
    this.userService = userService;
    this.adminService = adminService;

    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(8), Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^01[0125][0-9]{8}$')]], //add a pattern where all are numbers
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$')]],
      userType: [this.userTypesRadioButtons[0].value.toString(), [Validators.required]]
    });
  }

  get name() {
    return this.signUpForm.get('name');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get phoneNumber() {
    return this.signUpForm.get('phoneNumber');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get userType() {
    return this.signUpForm.get('userType');
  }




  async onSubmit() {
    if (this.signUpForm.valid) {
      const usrTypeVal: number = Number.parseInt(this.userType?.value);

      const adminPresent = await this.adminService.getAdminByEmail(this.email?.value)
      const userPresent = await this.userService.getUserByEmail(this.email?.value)
      const serviceProviderPresent = await this.servProvService.getServiceProviderByEmail(this.email?.value)

      if (adminPresent || userPresent || serviceProviderPresent) {
        this.toastService.showToast(false, "This email already exists, please choose a different one", '')
        return
      }


      if (usrTypeVal === this.accService.GetUsersEnum().Admin) {
        //create an admin
        const admin: Admin = {
          id: "",
          name: this.name?.value,
          email: this.email?.value,
          phoneNumber: this.phoneNumber?.value,
          password: this.password?.value,
          address: null,
        }


        console.log("Admin created " + JSON.stringify(admin));
        const res = await this.adminService.addAdmin(admin);
        if (!res) {
          this.toastService.showToast(false, "Unable to add admin at the moment", '')
        } else {
          this.toastService.showToast(true, "Admin successfully created", '')
        }


      } else if (usrTypeVal === this.accService.GetUsersEnum().User) {
        //create a user
        const user: User = {
          id: "",
          name: this.name?.value,
          email: this.email?.value,
          phoneNumber: this.phoneNumber?.value,
          password: this.password?.value,
          wallet: 0,
          address: null,
          waterBills: [],
          electricityBills: [],
          telephoneBills: []
        }
        console.log("Normal user created " + JSON.stringify(user));
        //call service to add user to db
        const res = await this.userService.addUser(user);
        if (!res) {
          this.toastService.showToast(false, "Unable to add user at the moment", '')
        } else {
          this.toastService.showToast(true, "User successfully created", '')
        }
      } else if (usrTypeVal === this.accService.GetUsersEnum().ServiceProvider) {
        //create an serviceProvider
        const serviceProvider: ServiceProvider = {
          id: "",
          name: this.name?.value,
          email: this.email?.value,
          phoneNumber: this.phoneNumber?.value,
          password: this.password?.value,
          address: null,
          offers: []
        }
        console.log("Service provide3r created " + JSON.stringify(serviceProvider));
        const res = await this.servProvService.addServiceProvider(serviceProvider);
        if (!res) {
          this.toastService.showToast(false, "Unable to add service provider at the moment", '')
        } else {
          this.toastService.showToast(true, "Service provider successfully created", '')
        }
      }
      //now navigate to the sign in page
      this.router.navigate(["/login"])
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
