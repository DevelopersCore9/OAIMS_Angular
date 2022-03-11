import { BoxPageComponent } from './../../../models/box-page/box-page.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigateProductDataService } from 'src/app/services/navigate-product-data.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import JwtDecode from 'src/app/utils/jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public dialog: MatDialog,
    private navigateService: NavigateProductDataService,
    public cartService: CartService,
    public router: Router,
    private jwtBreaker: JwtDecode,
    private _snackBar: MatSnackBar
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
    } else {
      console.log(this.loggedInUserData);
      this.loggedInUserData.name = '';
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(BoxPageComponent, {
      data: { package: '', sample: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result.package}`);
      console.log(`Dialog result: ${result.sample}`);
      // this.router.navigate(['/payment']);
    });
  }

  removeItem(index: any) {
    this.cartService.onRemoveItem(index);
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  saveInformation(
    name: any,
    city: any,
    number: any,
    userEmail: any,
    address: any
  ) {
    this.informationData = {
      name: name,
      city: city,
      number: number,
      userEmail: userEmail,
      address: address,
    };
    console.log(this.informationData);

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
}
