import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonUser, UserType } from '../../models/users/common.model';
import { ErrorsService } from '../../services/errors.service';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/users/user.model';
import { ServiceProvider } from '../../models/users/serviceProvider.model';
import { ServiceProviderService } from '../../services/service-provider.service';
import { PendingPaymentsUpdateService } from '../../services/pending-payments-update.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-edit-profile-info',
  templateUrl: './edit-profile-info.component.html',
  styleUrls: ['./edit-profile-info.component.css']
})
export class EditProfileInfoComponent implements OnInit {
  editProfileInfo: FormGroup;
  editProfileInfoTitle: string = "Your Information"
  pendingPayments: number = 0
  wallet: number = 0
  errs: any;
  canEditChecked: boolean = false
  accService: AccountService;


  constructor(private errService: ErrorsService, private formBuilder: FormBuilder,
    accService: AccountService, private userService: UserService, private adminService: AdminService,
    private servProvService: ServiceProviderService, private pendingPaymentsService: PendingPaymentsUpdateService,
    private toastService: ToastService) {
    this.errs = errService.getErrors().EditProfileInfoErrors
    this.accService = accService

    this.editProfileInfo = this.formBuilder.group({
      name: [this.accService.currentUser?.name, [Validators.required, Validators.minLength(3)]],
      email: [this.accService.currentUser?.email],  //email is disabled
      phoneNumber: [this.accService.currentUser?.phoneNumber, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^01[0125][0-9]{8}$')]], //pattern for phone number
      password: [this.accService.currentUser?.password, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$')]],
      street: [this.accService.currentUser?.address?.street, [Validators.minLength(3)]],
      buildingNum: [this.accService.currentUser?.address?.buildingNum, [Validators.pattern('^[1-9][0-9]*$')]], //pattern for all positive integers
      city: [this.accService.currentUser?.address?.city, [Validators.minLength(3)]],
      country: [this.accService.currentUser?.address?.country, [Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {



    if (this.accService.currentUserType === this.accService.GetUsersEnum().User) {
      this.editProfileInfoTitle = "User Information"
      const tmpUser = this.accService.currentUser as User
      this.wallet = tmpUser.wallet


      this.pendingPayments = this.accService.getTotalPendingPayments()
      //not really needed here
      this.pendingPaymentsService.updatePendingPaymentsSubj.subscribe(e => {
        this.pendingPayments = this.accService.getTotalPendingPayments()
      })

    }
    else if (this.accService.currentUserType === this.accService.GetUsersEnum().Admin)
      this.editProfileInfoTitle = "Admin Information"
    else if (this.accService.currentUserType === this.accService.GetUsersEnum().ServiceProvider)
      this.editProfileInfoTitle = "Service Provider Information"


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

  toggleCheckBox() {
    this.canEditChecked = !this.canEditChecked
    console.log(this.canEditChecked);
  }


  async onSubmit(): Promise<void> {
    if (!this.canEditChecked) {
      this.toastService.showToast(false, "Editing not enabled", '')
      return
    }
    if (this.editProfileInfo.valid) {
      const commonUsr: CommonUser = {
        id: this.accService.currentUser?.id || "", //get the current user id
        name: this.name?.value,
        email: this.email?.value,
        phoneNumber: this.phoneNumber?.value,
        password: this.password?.value,
        address: {
          street: this.street?.value,
          buildingNum: parseInt(this.buildingNum?.value ?? 0),
          city: this.city?.value,
          country: this.country?.value
        }
      };
      if (commonUsr.address && !commonUsr.address?.buildingNum) commonUsr.address.buildingNum = 0

      if (this.accService.currentUserType == this.accService.GetUsersEnum().Admin) {
        //update the admin
        console.log("Admin about to be updated " + JSON.stringify(commonUsr));
        if (await this.adminService.updateAdmin(commonUsr)) {
          this.accService.SetCurrentUser(commonUsr, UserType.Admin)
          this.toastService.showToast(true, "Admin details successfully updated", '')
        } else {
          this.toastService.showToast(false, "Unable to update admin details", '')
        }


      } else if (this.accService.currentUserType == this.accService.GetUsersEnum().User) {
        //update the user
        let user = this.accService.currentUser as User
        //todo: test this properly
        user = {
          ...user,     //keep the same User data (ex: electricity bills, and whatnot)
          ...commonUsr   //edit the commonUsr data
        }
        console.log("Normal user about to be updated " + JSON.stringify(user));
        if (await this.userService.updateUser(user)) {
          this.accService.SetCurrentUser(user, UserType.User)
          this.toastService.showToast(true, "User details successfully updated", '')
        } else {
          this.toastService.showToast(false, "Unable to update user details", '')
        }


      } else if (this.accService.currentUserType == this.accService.GetUsersEnum().ServiceProvider) {
        //update the service provider
        let srvProv = this.accService.currentUser as ServiceProvider
        //todo: test this properly
        srvProv = {
          ...srvProv,     //keep the same srv prov data (offers)
          ...commonUsr   //edit the commonUsr data
        }
        console.log("Service Provider about to be updated " + JSON.stringify(srvProv));
        if (await this.servProvService.updateServiceProvider(srvProv)) {
          this.accService.SetCurrentUser(srvProv, UserType.ServiceProvider)
          this.toastService.showToast(true, "Service provider details successfully updated", '')
        } else {
          this.toastService.showToast(false, "Unable to update service provider details", '')
        }
      }
    } else {
      this.toastService.showToast(false, "Invalid form", '')
      this.editProfileInfo.markAllAsTouched();
    }
  }

}