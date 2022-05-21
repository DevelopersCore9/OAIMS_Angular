import { Router } from '@angular/router';
import { InvoiceService } from './../../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import JwtDecode from 'src/app/utils/jwt-decode';
import { UserIdentityService } from 'src/app/services/user-identity.service';
import { OrderService } from 'src/app/services/order.service';
import { CartNotificationService } from 'src/app/services/cart-notification.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  public allDataCart: any;
  public isChecked: boolean = false;
  public user: any;
  public selectedPrice: number = 0;
  public selectedQuantity: number = 0;
  public totalPrice: number = 0;
  public discountValue : number = 0;
  constructor(
    private cartService: CartService,
    private invoiceService: InvoiceService,
    private userInformation: UserIdentityService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private orderService: OrderService,
    private cartNotificationService: CartNotificationService
  ) {}

  ngOnInit(): void {
    this.allDataCart = this.cartService.onCartGet();
    console.log('allDataCart', this.allDataCart);
    this.user = this.userInformation.onUserGet();
    console.log(this.user, 'this.user');

    this.setTotalPrice();
    this.checkDiscount();
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
    console.log("this isChecked",this.isChecked)
    if (this.isChecked == false ) {
      this.openSnackBar('Please select option first');
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
        this.cartNotificationService.resetNotificationValue();
        this.cartService.onCartReset();
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
  checkDiscount(){
    if(this.user.id == '' || this.user.id == this.user.id){
      this.discountValue = 0;
      console.log("Not logged In or old user",this.discountValue);
    }else{
      this.discountValue = this.totalPrice * 10/100;
      console.log("New User",this.discountValue);
    }
  }
  setTotalPrice() {
    for (var i = 0; i < this.allDataCart.length; i++) {
      this.selectedQuantity = parseInt(this.allDataCart[i].quantity);
      this.totalPrice =
        this.totalPrice +
        this.allDataCart[i].selectedPrice * this.selectedQuantity;
      console.log('the total price', this.totalPrice);
    }
  }
}
