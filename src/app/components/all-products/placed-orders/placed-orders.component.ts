import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from './../../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { CartNotificationService } from 'src/app/services/cart-notification.service';

@Component({
  selector: 'app-placed-orders',
  templateUrl: './placed-orders.component.html',
  styleUrls: ['./placed-orders.component.css'],
})
export class PlacedOrdersComponent implements OnInit {
  public placedOrdersData: any;
  public totalprice: any = 0;
  public deliveryCharges: any = 250;
  public grandTotal: any = 0;
  public type: any;
  public historyView = false;
  constructor(
    private invoiceService: InvoiceService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.type = params?.type;
    });

    this.placedOrdersData = this.invoiceService.getPaymentItems();
    if (this.type == 'history') {
      console.log(this.type);
      this.historyView = true;
      this.placedOrdersData = this.placedOrdersData.orderItems;
    }
    console.log('the orders which are placed are', this.placedOrdersData);

    for (let i = 0; i < this.placedOrdersData.length; i++) {
      this.totalprice +=
        this.placedOrdersData[i].price *
        parseInt(this.placedOrdersData[i].quantity);
    }
    this.grandTotal = this.totalprice + this.deliveryCharges;
  }
}
