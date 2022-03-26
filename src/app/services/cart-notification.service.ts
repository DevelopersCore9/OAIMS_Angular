import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartNotificationService {
  private notification = new BehaviorSubject<number>(
    parseInt(localStorage.getItem('cartCount') || '{}')
      ? parseInt(localStorage.getItem('cartCount') || '{}')
      : 0
  );
  currentNotification = this.notification.asObservable();

  constructor() {}

  changeNotification(notify: number) {
    console.log(this.getNotificationValue(), '', notify);
    const currentValue = this.getNotificationValue();
    if (!currentValue) {
      localStorage.setItem('cartCount', notify.toString());
      this.notification.next(notify);
    } else {
      localStorage.setItem('cartCount', (currentValue + notify).toString());
      this.notification.next(currentValue + notify);
    }
  }

  getNotificationValue() {
    if (localStorage.getItem('cartCount')) {
      return parseInt(localStorage.getItem('cartCount') || '{}');
    } else {
      return 0;
    }
  }

  minusNotificationValue() {
    if (localStorage.getItem('cartCount')) {
      let value = parseInt(localStorage.getItem('cartCount') || '{}') - 1;
      localStorage.setItem('cartCount', value.toString());
      this.notification.next(value);
      return parseInt(localStorage.getItem('cartCount') || '{}');
    } else {
      return 0;
    }
  }

  resetNotificationValue() {
    localStorage.setItem('cartCount', (0).toString());
    this.notification.next(0);
  }
}
