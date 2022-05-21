import { AuthService } from './../../services/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserLogin } from '../../utils/userlogin';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  matcher = new MyErrorStateMatcher();


  logInFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  logInPasswordControl = new FormControl('', [
    Validators.required, Validators.maxLength(12)
  ])
  signUpPasswordControl = new FormControl('', [
    Validators.required, Validators.maxLength(12)
  ])
  confirmPasswordControl = new FormControl('', [
    Validators.required, Validators.maxLength(12)
  ])
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);

  signUpFormControl = new FormControl('', [Validators.required, Validators.email]);

  // loginEmail = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  submitted = false;
  constructor(
    protected route: Router,
    private authS: AuthService,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
  }
  // getErrorMessageLogin() {
  //   if (this.loginEmail.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.loginEmail.hasError('email') ? 'Not a valid email' : '';
  // }
  // getErrorMessageSignUp() {
  //   if (this.signUpEmail.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.signUpEmail.hasError('email') ? 'Not a valid email' : '';
  // }



  userLogin(email: string, password: string) {
    this.authS.userLogin(email, password);
  }
  userSignUp(name: string, email: string, password: string,confirmPassword: string) {
    if(password == confirmPassword) {
      let obj = {
        name: name,
        email: email,
        password: password
      }
      this.authS.userSignUp(obj);
    } else {
      this.openSnackBar('The password dont match');
    }

  }
  openSnackBar(message: string) {
    this._snackBar.open(message, ' ', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5 * 1000,
    });
  }
}
