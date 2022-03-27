import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from './host.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient, private hostAddress: HostService) {}
  //as
  addReview(review_obj: any) {
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
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  getReview(id: string) {
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
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
}
