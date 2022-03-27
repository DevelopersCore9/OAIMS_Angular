import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from './host.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient, private hostAddress: HostService) {}

  addCustomerMessage(
    name: string,
    email: string,
    subject: string,
    comment: string
  ) {
    let customer = {
      name: name,
      email: email,
      subject: subject,
      comment: comment,
    };
    console.log('customer :', customer);
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.hostAddress.getHostIp()}/api/contactUs`, customer)
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
}
