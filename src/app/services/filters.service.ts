import { HttpClient } from '@angular/common/http';
import { HostService } from './host.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  constructor(private http: HttpClient, private hostAddress: HostService) {}

  getfilterCategories() {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.hostAddress.getHostIp()}/api/sub-categories/category`)
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
}
