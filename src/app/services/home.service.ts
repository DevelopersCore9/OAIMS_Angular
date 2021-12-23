import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HostService } from './host.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private hostAddress: HostService, protected http: HttpClient) {}

  SliderData() {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.hostAddress.getHostIp()}/api/products/featured`)
        .toPromise()
        .then((data: any) => {
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

  getCollectionData() {
    return new Promise<any>((resolve, reject) => {
      const formData = new FormData()
      formData.append("type", "summer")

      let params = new HttpParams().set("type", "summer");
      this.http
        .get(`${this.hostAddress.getHostIp()}/api/products/collection`, {params})
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
