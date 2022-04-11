import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from './../../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { CartNotificationService } from 'src/app/services/cart-notification.service';
import { UserIdentityService } from 'src/app/services/user-identity.service';
import { OrderService } from 'src/app/services/order.service';
import JwtDecode from 'src/app/utils/jwt-decode';

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
  number = 0;
  orders: any;
  loggedInUserData: any;

  constructor(
    private invoiceService: InvoiceService,
    public route: ActivatedRoute,
    private userIdentityService: UserIdentityService,
    private orderService: OrderService,
    private router: Router,
    private jwtBreaker: JwtDecode
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.loggedInUserData = this.jwtBreaker.decodedToken(
        sessionStorage.getItem('token')
      );
      this.orderService
        .getOrderById({ id: this.loggedInUserData.userId })
        .subscribe((data) => {
          this.orders = data;
          console.log('the orders are', this.orders);
          this.setProductData(this.orders);
        });
    } else {
      let user = this.userIdentityService.onUserGet();
      this.number = user.number;
      this.orderService
        .getOrderByNumber({ phone: this.number })
        .subscribe((data) => {
          console.log(data);
          this.orders = data;
          console.log('the orders are', this.orders);
          this.setProductData(this.orders);
        });
    }
  }

  setProductData(orders: any) {
    let id: any;
    this.route.queryParams.subscribe((params) => {
      this.type = params?.type;
      id = params?.id;
    });

    this.placedOrdersData = orders;
    if (this.type == 'history') {
      console.log(this.type);
      this.historyView = true;
      this.placedOrdersData = orders.orderItems;
      this.placedOrdersData = orders.find((o: { _id: any }) => o._id == id);
    } else {
      this.placedOrdersData = orders[0];
    }
    console.log('the orders which are placed are', this.placedOrdersData);

    for (let i = 0; i < this.placedOrdersData?.orderItems?.length; i++) {
      console.log(
        'this.placedOrdersData[i].price;',
        this.placedOrdersData.orderItems[i].price
      );
      this.totalprice += this.placedOrdersData.orderItems[i].price;
      // parseInt(this.placedOrdersData[i].quantity);
      console.log('this.totalprice', this.totalprice);
    }
    this.grandTotal = this.totalprice + this.deliveryCharges;
  }
}
