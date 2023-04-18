import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonUser } from '../models/users/common.model';
import { Admin } from '../models/users/admin.model';
import { User } from '../models/users/user.model';
import { ErrorsService } from '../shared/services/errors.service';
import { UserService } from '../shared/services/user.service';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  commonUser: CommonUser = {
    id: "", //auto generated
    name: "",   //required
    email: "",  //required
    phoneNumber: "",    //required
    password: "",       //required
    address: null,
  };


  errs: any;

  constructor(private errService: ErrorsService, private formBuilder: FormBuilder, private userService: UserService, private adminService: AdminService) {
    this.errs = errService.getErrors().SignUpErrors
    this.userService = userService;
    this.adminService = adminService;

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
  get isAdminChecked() {
    return this.signUpForm.get('isAdminChecked');
  }




  onSubmit() {
    if (this.signUpForm.valid) {
      console.log("isAdminChecked " + this.isAdminChecked?.value)
      if (this.isAdminChecked?.value) {
        //create an admin
        const admin: Admin = {
          ...this.commonUser,
          name: this.name?.value,
          email: this.email?.value,
          phoneNumber: this.phoneNumber?.value,
          password: this.password?.value,
        }
        console.log("Admin created " + JSON.stringify(admin));
        this.adminService.addAdmin(admin);

      } else {
        //create a user
        const user: User = {
          ...this.commonUser,
          name: this.name?.value,
          email: this.email?.value,
          phoneNumber: this.phoneNumber?.value,
          password: this.password?.value,
          wallet: 0,
          address: null,
          waterBills: [],
          electrictyBills: [],
          telephoneBills: []
        }
        console.log("Normal user created " + JSON.stringify(user));
        //call service to add user to db
        this.userService.addUser(user);

      }

    } else {

      this.signUpForm.markAllAsTouched();
    }
  }
}
