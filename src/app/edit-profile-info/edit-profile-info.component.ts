import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonUser } from '../models/users/common.model';
import { ErrorsService } from '../services/errors.service';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
import { User } from '../models/users/user.model';
import { ServiceProvider } from '../models/users/serviceProvider.model';
import { ServiceProviderService } from '../services/service-provider.service';

@Component({
  selector: 'app-edit-profile-info',
  templateUrl: './edit-profile-info.component.html',
  styleUrls: ['./edit-profile-info.component.css']
})
export class EditProfileInfoComponent {
  signUpForm: FormGroup;


  errs: any;

  constructor(private errService: ErrorsService, private formBuilder: FormBuilder,
    private accService: AccountService, private userService: UserService, private adminService: AdminService,
    private servProvService: ServiceProviderService) {
    this.errs = errService.getErrors().EditProfileInfoErrors

    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(8), Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^01[0125][0-9]{8}$')]], //add a pattern where all are numbers
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$')]],
      isAdminChecked: [false]

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
  get street() {
    return this.signUpForm.get('street');
  }
  get buildingNum() {
    return this.signUpForm.get('buildingNum');
  }
  get city() {
    return this.signUpForm.get('city');
  }
  get country() {
    return this.signUpForm.get('country');
  }





  onSubmit() {
    if (this.signUpForm.valid) {
      const commonUsr: CommonUser = {
        id: this.accService.currentUser?.id || "", //get the current user id
        name: this.name?.value,
        email: this.email?.value,
        phoneNumber: this.phoneNumber?.value,
        password: this.password?.value,
        address: {
          street: this.street?.value,
          buildingNum: this.buildingNum?.value,
          city: this.city?.value,
          country: this.country?.value
        }
      };
      if (this.accService.currentUserType == this.accService.GetUsersEnum().Admin) {
        //update the admin
        console.log("Admin about to be updated " + JSON.stringify(commonUsr));
        this.adminService.updateAdmin(commonUsr);

      } else if (this.accService.currentUserType == this.accService.GetUsersEnum().User) {
        //update the user
        let user = this.accService.currentUser as User
        //todo: test this properly
        user = {
          ...commonUsr,   //edit the commonUsr data
          ...user     //keep the same User data (ex: electricity bills, and whatnot)
        }
        console.log("Normal user about to be updated " + JSON.stringify(user));
        this.userService.updateUser(user);

      } else if (this.accService.currentUserType == this.accService.GetUsersEnum().ServiceProvider) {
        //update the service provider
        let srvProv = this.accService.currentUser as ServiceProvider
        //todo: test this properly
        srvProv = {
          ...commonUsr,   //edit the commonUsr data
          ...srvProv     //keep the same srv prov data (offers)
        }
        console.log("Service Provider about to be updated " + JSON.stringify(srvProv));
        this.servProvService.addServiceProvider(srvProv);
      }
    } else {

      this.signUpForm.markAllAsTouched();
    }
  }
}