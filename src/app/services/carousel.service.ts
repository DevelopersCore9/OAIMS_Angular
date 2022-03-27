import { HttpClient } from '@angular/common/http';
import { HostService } from './host.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  constructor(public hostAddress: HostService, public http: HttpClient) {}

  getCarouselImages() {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.hostAddress.getHostIp()}/api/carousels`)
        .toPromise()
        .then((data: any) => {
          console.log('images:', data);
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
