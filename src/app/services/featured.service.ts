import { SpinnerService } from './spinner.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from './host.service';

@Injectable({
  providedIn: 'root'
})
export class FeaturedService {

  constructor(
    public hostAddress: HostService,
    public http: HttpClient,
    protected spin: SpinnerService
  ) { }

  getFeaturedProducts() {
    this.spin.changeSpinnerState(true)
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.hostAddress.getHostIp()}/api/products/featured/`)
        .toPromise()
        .then((data: any) => {
          console.log(data);
          if (data == null) {
            console.log(data);
          }
          this.spin.changeSpinnerState(false)
          resolve(data.payload);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
}
