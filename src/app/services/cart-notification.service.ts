import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartNotificationService {
  private notification = new BehaviorSubject<number>(0);
  currentNotification = this.notification.asObservable();

  constructor() { }

  changeNotification(notify: number) {
    console.log(this.getNotificationValue() + notify);

    this.notification.next(this.getNotificationValue() + notify);
  }
  getNotificationValue() {
    return this.notification.value
  }
}
