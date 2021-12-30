import { BoxPageComponent } from './../../models/box-page/box-page.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigateProductDataService } from 'src/app/services/navigate-product-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public edited: true | any;
  public cartData: any;
  public informationData : any;
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(
    public dialog: MatDialog,
    private navigateService: NavigateProductDataService
  ) { }

  ngOnInit(): void {
    this.edited = !this.edited

    this.cartData = this.navigateService.getData()
    console.log("the cart data is:",this.cartData)

  }
  openDialog() {
    const dialogRef = this.dialog.open(BoxPageComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  saveInformation(name:any,city:any,number:any,userEmail:any,address:any) {
    this.informationData = {
      name: name,
      city: city,
      number: number,
      userEmail: userEmail,
      address: address
    }
    console.log("the information of new user is:",this.informationData)
  }
}
