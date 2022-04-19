import { BoxPageComponent } from './../../../models/box-page/box-page.component';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigateProductDataService } from 'src/app/services/navigate-product-data.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import JwtDecode from 'src/app/utils/jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserIdentityService } from 'src/app/services/user-identity.service';
import { CartNotificationService } from 'src/app/services/cart-notification.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public edited: true | any;
  public cartData: any;
  public informationData: any;
  public loggedInUserData: any = {};
  public cartCount: any = {};
  public selectedPrice: number = 0;
  public selectedQuantity: number = 0;
  public totalPrice: number = 0;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$'),
  ]);
  cityFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  constructor(
    public dialog: MatDialog,
    private navigateService: NavigateProductDataService,
    public cartService: CartService,
    public router: Router,
    private jwtBreaker: JwtDecode,
    private _snackBar: MatSnackBar,
    private UserIdentityService: UserIdentityService,
    private cartNotificationService: CartNotificationService
  ) {}

  ngOnInit(): void {
    this.edited = !this.edited;

    this.cartData = this.cartService.onCartGet();
    console.log('the cart data is:', this.cartData);

    if (sessionStorage.getItem('token')) {
      this.loggedInUserData = this.jwtBreaker.decodedToken(
        sessionStorage.getItem('token')
      );
      console.log('logged in user datga', this.loggedInUserData);
    } else if (this.UserIdentityService.onUserGet()) {
      console.log(
        'this.loggedInUserData',
        (this.loggedInUserData = this.UserIdentityService.onUserGet())
      );

      this.loggedInUserData = this.UserIdentityService.onUserGet();
    }
    this.setTotalPrice();
  }

  openDialog() {
    const dialogRef = this.dialog.open(BoxPageComponent, {
      data: { package: '', sample: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result.package}`);
      console.log(`Dialog result: ${result.sample}`);
      this.router.navigate(['/payment']);
    });
  }

  removeItem(index: any) {
    this.cartData = this.cartService.onRemoveItem(index);
    this.cartNotificationService.minusNotificationValue();
  }

  saveInformation(
    name: any,
    city: any,
    number: any,
    userEmail: any,
    address: any
  ) {
    console.log('name', name);
    console.log('city', city);
    console.log('number', number);
    console.log('userEmail', userEmail);
    console.log('address', address);
    this.informationData = {
      name: name,
      city: city,
      number: number,
      userEmail: userEmail,
      address: address,
    };
    if (this.loggedInUserData?.userId) {
      this.informationData.userId = this.loggedInUserData?.userId;
    }
    console.log(this.informationData);
    this.UserIdentityService.onUserSave(this.informationData);
    console.log('the information of new user is:', this.informationData);
    this.openDialog();
    // this.cartService.onCartSave(this.cartData);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, ' ', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5 * 1000,
    });
  }

  setTotalPrice() {
    for (var i = 0; i < this.cartData.length; i++) {
      this.selectedQuantity = parseInt(this.cartData[i].quantity);
      this.totalPrice =
        this.totalPrice +
        this.cartData[i].selectedPrice * this.selectedQuantity;
      console.log('the total price', this.totalPrice);
    }
  }
}
