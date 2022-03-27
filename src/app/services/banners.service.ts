import { HttpClient } from '@angular/common/http';
import { HostService } from './host.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BannersService {
  constructor(private hostAddress: HostService, private http: HttpClient) {}
  getBanner() {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.hostAddress.getHostIp()}/api/banners/`)
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

  getCategoriesImages() {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.hostAddress.getHostIp()}/api/categoryImages/`)
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
