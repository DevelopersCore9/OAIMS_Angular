import { Router } from '@angular/router';
import { UserIdentityService } from './../../../services/user-identity.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import JwtDecode from 'src/app/utils/jwt-decode';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css'],
})
export class OrdersHistoryComponent implements OnInit {
  number = 0;
  orders: any;
  loggedInUserData: any;
  constructor(
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
      console.log('logged in user datga', this.loggedInUserData);
      this.orderService
        .getOrderById({ id: this.loggedInUserData.userId })
        .subscribe((data) => {
          console.log(data);
          this.orders = data;
        });
    } else {
      let user = this.userIdentityService.onUserGet();
      this.number = user.number;
      console.log('this.userIdentityService.onUserGet()', this.number);
      this.orderService
        .getOrderByNumber({ phone: this.number })
        .subscribe((data) => {
          console.log(data);
          this.orders = data;
        });
    }
  }

  displayOrders(id: string) {
    this.router.navigate(['/placed-orders'], {
      queryParams: { id: id },
    });
  }
}
