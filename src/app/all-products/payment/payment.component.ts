import { Router } from '@angular/router';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import JwtDecode from 'src/app/utils/jwt-decode';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public allDataCart: any;
  public isChecked: boolean = false;

  constructor(
    private cartService: CartService,
    private invoiceService: InvoiceService,
    private router: Router,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.allDataCart = this.cartService.onCartGet()
    this.isChecked = true;
    console.log(this.allDataCart)


  }

  onRemoveItem(index: number) {
    this.cartService.onRemoveItem(index)
  }
  cashOnDeliveryRadioButtonCheck(event: any) {
    console.log(event.value)
    this.isChecked = event.value
  }

  sendDataToInvoice() {
    if (this.isChecked == null) {
      this.openSnackBar("Please select the option first")
    }
    else {
      this.invoiceService.savePaymentItems(this.allDataCart);
      this.router.navigate(['/placed-orders'])
    }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, " ", {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 5 * 1000,
    });
  }
}
