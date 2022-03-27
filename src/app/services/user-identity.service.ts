import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import JwtDecode from '../utils/jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserIdentityService {
  private userIdentity = new BehaviorSubject<string>('');
  userIdentityValue = this.userIdentity.asObservable();
  userArray: any;
  cartCount: any;
  constructor(private jwtBreaker: JwtDecode) {}

  changeUserIdentity(id: string): void {
    this.userIdentity.next(id);
    console.log(this.userIdentity);
    console.log(this.userIdentity.value);
  }

  getUserIdentity(): string {
    if (!this.userIdentity.value) {
      let data = this.jwtBreaker.decodedToken(sessionStorage.getItem('token'));
      return data.id;
    } else {
      console.log(this.userIdentity);
      // return "6176b7480d43e54348a62c6b"
      return this.userIdentity.value;
    }
  }

  onUserSave(obj: any) {
    this.userArray = obj;
    localStorage.setItem('userArray', JSON.stringify(this.userArray));
  }

  onUserGet() {
    if (localStorage.getItem('userArray')) {
      return JSON.parse(localStorage.getItem('userArray') || '{}');
    }
  }

  onRemoveItem() {
    this.userArray = null;
    localStorage.removeItem('userArray');
  }

  onCartGet() {
    if (localStorage.getItem('cartCount')) {
      return JSON.parse(localStorage.getItem('cartCount') || '{}');
    }
  }
  onCountSave(count: any) {
    this.cartCount = count;
    localStorage.setItem('cartCount', JSON.stringify(this.cartCount));
  }
}
