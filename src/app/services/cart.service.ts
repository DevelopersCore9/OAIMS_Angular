import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartArray: any[] = [];
  constructor() {}

  onCartSave(obj: any) {
    this.cartArray.push(obj);
    localStorage.setItem('names', JSON.stringify(this.cartArray));
  }

  onCartGet() {
    if (localStorage.getItem('names')) {
      return JSON.parse(localStorage.getItem('names') || '{}');
    }
  }

  onRemoveItem(index: any) {
    this.cartArray.splice(index, 1);
    localStorage.setItem('names', JSON.stringify(this.cartArray));
  }
}
