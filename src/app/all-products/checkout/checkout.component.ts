import { BoxPageComponent } from './../../models/box-page/box-page.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigateProductDataService } from 'src/app/services/navigate-product-data.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public edited: true | any;
  public cartData: any;
  public informationData: any;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public dialog: MatDialog,
    private navigateService: NavigateProductDataService,
    public cartService: CartService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.edited = !this.edited;

    this.cartData = this.cartService.onCartGet();
    console.log('the cart data is:', this.cartData);
  }

  openDialog() {
    const dialogRef = this.dialog.open(BoxPageComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['/payment']);
    });
  }

  removeItem() {
    this.cartService.onRemoveItem();
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
    console.log('the information of new user is:', this.informationData);
    this.openDialog();
    // this.cartService.onCartSave(this.cartData);
  }
}
