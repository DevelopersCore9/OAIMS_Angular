import { HttpClient, HttpParams } from '@angular/common/http';
import { HostService } from './host.service';
import { Injectable } from '@angular/core';
import { Observable, defer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(public hostAddress: HostService, public http: HttpClient) {}

  getTopSelling() {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.hostAddress.getHostIp()}/api/products/topSelling`)
        .toPromise()
        .then((data: any) => {
          console.log(data);
          if (data == null) {
            console.log(data);
          }

          resolve(data.payload);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  getAllProducts() {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.hostAddress.getHostIp()}/api/products?page=1&limit=10`)
        .toPromise()
        .then((data: any) => {
          console.log(data);
          if (data == null) {
            console.log(data);
          }

          resolve(data.payload);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  CustomProductsCategory(categoryName: string): Observable<any> {
    let obj = { category: categoryName };
    // return this.http.post(`${this.hostAddress.getHostIp()}/api/products/category`, obj)
    return defer(() => {
      return new Promise((resolve, reject) => {
        this.http
          .post(`${this.hostAddress.getHostIp()}/api/products/category`, obj)
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

  CustomProductsSubCategory(categoryName: string): Observable<any> {
    let obj = { subCategory_id: categoryName };
    // return this.http.post(`${this.hostAddress.getHostIp()}/api/products/category`, obj)
    return defer(() => {
      return new Promise((resolve, reject) => {
        this.http
          .post(`${this.hostAddress.getHostIp()}/api/products/subcategory`, obj)
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

  getProduct(id: string) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.hostAddress.getHostIp()}/api/products/byId?id=${id}`)
        .toPromise()
        .then((data: any) => {
          console.log(data);
          if (data == null) {
            console.log(data);
          }

          resolve(data.payload);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
}
