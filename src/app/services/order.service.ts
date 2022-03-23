import { SpinnerService } from './spinner.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HostService } from './host.service';
import { Injectable } from '@angular/core';
import { Observable, defer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    public hostAddress: HostService,
    public http: HttpClient,
    protected spin: SpinnerService
  ) {}

  placeOrder(obj: string): Observable<any> {
    // return this.http.post(`${this.hostAddress.getHostIp()}/api/products/category`, obj)
    return defer(() => {
      return new Promise((resolve, reject) => {
        this.http
          .post(`${this.hostAddress.getHostIp()}/api/orders`, obj)
          .toPromise()
          .then((data: any) => {
            console.log(data);
            if (data == null) {
              console.log(data.payload);
            }
            resolve(data.payload);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    });
  }

  getOrderByNumber(data: any): Observable<any> {
    // return this.http.post(`${this.hostAddress.getHostIp()}/api/products/category`, obj)
    return defer(() => {
      return new Promise((resolve, reject) => {
        this.http
          .post(`${this.hostAddress.getHostIp()}/api/orders/phone`, data)
          .toPromise()
          .then((data: any) => {
            console.log(data);
            if (data == null) {
              console.log(data.payload);
            }
            resolve(data.payload);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    });
  }

  getOrderById(data: any): Observable<any> {
    // return this.http.post(`${this.hostAddress.getHostIp()}/api/products/category`, obj)
    return defer(() => {
      return new Promise((resolve, reject) => {
        this.http
          .post(`${this.hostAddress.getHostIp()}/api/orders/id`, data)
          .toPromise()
          .then((data: any) => {
            console.log(data);
            if (data == null) {
              console.log(data.payload);
            }
            resolve(data.payload);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    });
  }
}
