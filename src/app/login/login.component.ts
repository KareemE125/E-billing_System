import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorsService } from '../services/errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  loginForm: FormGroup;

  errs: any;

  constructor(private errService: ErrorsService, private formBuilder: FormBuilder) {
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

  onSubmit() {
    if (this.loginForm.valid) {
      // perform login action
      console.log({
        email: this.email?.value,
        password: this.password?.value
      });
    } else {

      this.loginForm.markAllAsTouched();
    }
  }

}
