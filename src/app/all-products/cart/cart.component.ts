import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }
  inputnumber = 0;

  plus()
  {
   this.inputnumber = this.inputnumber+1;
  }
  minus()
  {
    if(this.inputnumber != 0)
  {
   this.inputnumber = this.inputnumber-1;
  }

  }
  ngOnInit(): void {
  }

}
