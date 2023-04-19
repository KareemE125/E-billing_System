import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonUser } from '../models/users/common.model';
import { ErrorsService } from '../shared/services/errors.service';
import { AccountService } from '../shared/services/account.service';
import { UserService } from '../shared/services/user.service';
import { AdminService } from '../shared/services/admin.service';
import { User } from '../models/users/user.model';
import { ServiceProvider } from '../models/users/serviceProvider.model';
import { ServiceProviderService } from '../shared/services/service-provider.service';

@Component({
  selector: 'app-edit-profile-info',
  templateUrl: './edit-profile-info.component.html',
  styleUrls: ['./edit-profile-info.component.css']
})
export class EditProfileInfoComponent {
  editProfileInfo: FormGroup;
  currUser?: CommonUser;

  errs: any;

  constructor(private errService: ErrorsService, private formBuilder: FormBuilder,
    private accService: AccountService, private userService: UserService, private adminService: AdminService,
    private servProvService: ServiceProviderService) {
    this.errs = errService.getErrors().EditProfileInfoErrors

    this.currUser = accService.currentUser
    this.editProfileInfo = this.formBuilder.group({
      name: [this.currUser?.name, [Validators.required, Validators.minLength(3)]],
      email: [this.currUser?.email],  //email is disabled
      phoneNumber: [this.currUser?.phoneNumber, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^01[0125][0-9]{8}$')]], //pattern for phone number
      password: [this.currUser?.password, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$')]],
      street: [this.currUser?.address?.street, [Validators.minLength(3)]],
      buildingNum: [this.currUser?.address?.buildingNum, [Validators.pattern('^[1-9][0-9]*$')]], //pattern for all positive integers
      city: [this.currUser?.address?.city, [Validators.minLength(3)]],
      country: [this.currUser?.address?.country, [Validators.minLength(3)]],
    });
  }

  get name() {
    return this.editProfileInfo.get('name');
  }
  get email() {
    return this.editProfileInfo.get('email');
  }
  get phoneNumber() {
    return this.editProfileInfo.get('phoneNumber');
  }
  get password() {
    return this.editProfileInfo.get('password');
  }
  get street() {
    return this.editProfileInfo.get('street');
  }
  get buildingNum() {
    return this.editProfileInfo.get('buildingNum');
  }
  get city() {
    return this.editProfileInfo.get('city');
  }
  get country() {
    return this.editProfileInfo.get('country');
  }



  onSubmit() {
    if (this.editProfileInfo.valid) {
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
          ...user,     //keep the same User data (ex: electricity bills, and whatnot)
          ...commonUsr   //edit the commonUsr data
        }
        console.log("Normal user about to be updated " + JSON.stringify(user));
        this.userService.updateUser(user);

      } else if (this.accService.currentUserType == this.accService.GetUsersEnum().ServiceProvider) {
        //update the service provider
        let srvProv = this.accService.currentUser as ServiceProvider
        //todo: test this properly
        srvProv = {
          ...srvProv,     //keep the same srv prov data (offers)
          ...commonUsr   //edit the commonUsr data
        }
        console.log("Service Provider about to be updated " + JSON.stringify(srvProv));
        this.servProvService.updateServiceProvider(srvProv);
      }
    } else {

      this.editProfileInfo.markAllAsTouched();
    }
  }
}