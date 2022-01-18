import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-placed-orders',
  templateUrl: './placed-orders.component.html',
  styleUrls: ['./placed-orders.component.css']
})
export class PlacedOrdersComponent implements OnInit {
  public placedOrdersData : any;
  constructor(
    private invoiceService : InvoiceService
  ) { }

  ngOnInit(): void {
   this.placedOrdersData =  this.invoiceService.getPaymentItems();
   console.log("the orders which are placed are", this.placedOrdersData)
  }

}
