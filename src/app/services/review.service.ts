import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from './host.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private http: HttpClient,
    private hostAddress: HostService,
    protected spin: SpinnerService
  ) {}

  addReview(review_obj: any) {
    this.spin.changeSpinnerState(true);
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.hostAddress.getHostIp()}/api/products/reviews/`,
          review_obj
        )
        .toPromise()
        .then((data: any) => {
          console.log(data);
          if (data == null) {
            console.log(data);
          }
          resolve(data);
          this.spin.changeSpinnerState(false);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  getReview(id: string) {
    this.spin.changeSpinnerState(true);
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.hostAddress.getHostIp()}/api/products/reviews/${id}`)
        .toPromise()
        .then((data: any) => {
          console.log(data);
          if (data == null) {
            console.log(data);
          }
          resolve(data.payload);
          this.spin.changeSpinnerState(false);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
}
