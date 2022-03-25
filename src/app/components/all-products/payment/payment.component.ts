import { Router } from '@angular/router';
import { InvoiceService } from './../../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import JwtDecode from 'src/app/utils/jwt-decode';
import { UserIdentityService } from 'src/app/services/user-identity.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  public allDataCart: any;
  public isChecked: boolean = false;
  public user: any;

  constructor(
    private cartService: CartService,
    private invoiceService: InvoiceService,
    private userInformation: UserIdentityService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.allDataCart = this.cartService.onCartGet();
    this.isChecked = true;
    console.log('allDataCart', this.allDataCart);
    this.user = this.userInformation.onUserGet();
    console.log(this.user, 'this.user');
  }

  onRemoveItem(index: number) {
    this.cartService.onRemoveItem(index);
  }
  cashOnDeliveryRadioButtonCheck(event: any) {
    console.log(event.value);
    this.isChecked = event.value;
  }

  sendDataToInvoice() {
    let orderItems: any = [];
    this.allDataCart.map((item: any, index: any) => {
      orderItems.push({
        quantity: item.quantity,
        color: item.colorSelected,
        product: item._id,
        size: item.selectedSize,
        price: item.selectedPrice,
        box: '622ddf833996892a9140eaa0',
      });
    });
    if (this.isChecked == null) {
      this.openSnackBar('Please select the option first');
    } else {
      let finalObj: any = {
        orderItems: orderItems,
        shippingAddress: this.user.address,
        city: this.user.city,
        country: 'Pakistan',
        phone: this.user.number,
        user: this.user.userId,
        comments: 'This is a comment of order',
      };
      console.log(finalObj);
      this.orderService.placeOrder(finalObj).subscribe((data: any) => {
        console.log(data);
        this.invoiceService.savePaymentItems(this.allDataCart);
        this.router.navigate(['/placed-orders']);
      });
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
