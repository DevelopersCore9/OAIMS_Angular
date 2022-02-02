import { AuthService } from './../../services/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserLogin } from '../../utils/userlogin';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginEmail = new FormControl('', [Validators.required, Validators.email]);
  signUpEmail = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  submitted = false;
  constructor(
    protected route: Router,
    private authS: AuthService,
  ) { }

  ngOnInit(): void {
  }
  getErrorMessageLogin() {
    if (this.loginEmail.hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginEmail.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessageSignUp() {
    if (this.signUpEmail.hasError('required')) {
      return 'You must enter a value';
    }
    return this.signUpEmail.hasError('email') ? 'Not a valid email' : '';
  }
  userLogin(email: string, password: string) {
    this.authS.userLogin(email, password);
  }
  userSignUp(name: string, email: string, password: string) {
    let obj = {
      name: name,
      email: email,
      password: password
    }
    this.authS.userSignUp(obj);
  }
}
