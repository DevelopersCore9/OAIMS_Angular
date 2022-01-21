import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartArray: any[] = []
  constructor() { }

  onCartSave(obj: any) {
    this.cartArray.push(obj);
  }

  onCartGet() {
    return this.cartArray;
  }

  onRemoveItem(index: any) {
    this.cartArray.splice(index, 1);
  }
}
