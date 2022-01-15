import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public allDataCart : any;
  constructor(
    private cartService : CartService
  ) { }

  ngOnInit(): void {
    this.allDataCart = this.cartService.onCartGet()
    console.log(this.allDataCart)
  }

  onRemoveItem(){
    this.cartService.onRemoveItem()
  }
}
