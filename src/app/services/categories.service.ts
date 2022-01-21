import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from './host.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    public hostAddress : HostService,
    public http : HttpClient
  ) { }

  getCategoriesName() {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.hostAddress.getHostIp()}/api/categories`)
        .toPromise()
        .then((data: any) => {
          console.log('categoriesName:', data);
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
