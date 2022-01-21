import { Router } from '@angular/router';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public allDataCart : any;
  public isChecked: boolean = false;
  constructor(
    private cartService : CartService,
    private invoiceService : InvoiceService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.allDataCart = this.cartService.onCartGet()
    this.isChecked = true;
    console.log(this.allDataCart)

  }

  onRemoveItem(){
    this.cartService.onRemoveItem()
  }
  cashOnDeliveryRadioButtonCheck(){
    if(this.isChecked == true){
      this.isChecked = false;
      console.log("false",this.isChecked)
    }else{
      this.isChecked = true;
      console.log("true",this.isChecked)
    }
  }

  sendDataToInvoice(){
    this.invoiceService.savePaymentItems(this.allDataCart);
    this.router.navigate(['/placed-orders'])
  }
}
