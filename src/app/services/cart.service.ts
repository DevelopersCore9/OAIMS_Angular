import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartArray: any[] = [];
  constructor() {}

  onCartSave(obj: any) {
    let objs = this.onCartGet();
    if (objs) {
      this.cartArray = objs;
      this.cartArray.push(obj);
      localStorage.setItem('names', JSON.stringify(this.cartArray));
    } else {
      this.cartArray.push(obj);
      localStorage.setItem('names', JSON.stringify(this.cartArray));
    }
  }

  onCartGet() {
    if (localStorage.getItem('names')) {
      return JSON.parse(localStorage.getItem('names') || '{}');
    }
  }

  onRemoveItem(index: any) {
    this.cartArray = this.onCartGet();
    this.cartArray.splice(index, 1);
    localStorage.setItem('names', JSON.stringify(this.cartArray));
    return this.cartArray;
  }

  onCartReset() {
    this.cartArray.length = 0;
    localStorage.setItem('names', '');
  }
}
