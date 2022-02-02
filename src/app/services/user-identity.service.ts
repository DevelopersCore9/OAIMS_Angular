import { SpinnerService } from './spinner.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import JwtDecode from '../utils/jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserIdentityService {
  private userIdentity = new BehaviorSubject<string>("");
  userIdentityValue = this.userIdentity.asObservable();

  constructor(
    private jwtBreaker: JwtDecode,
    protected spin: SpinnerService
  ) { }


  changeUserIdentity(id: string): void {
    this.userIdentity.next(id)
    console.log(this.userIdentity);
    console.log(this.userIdentity.value);
  }

  getUserIdentity(): string {

    this.spin.changeSpinnerState(true)
    if (!this.userIdentity.value) {
      let data = this.jwtBreaker.decodedToken(sessionStorage.getItem("token"));
      this.spin.changeSpinnerState(false)
      return data.id
    }
    else {
      console.log(this.userIdentity)
      // return "6176b7480d43e54348a62c6b"
      return this.userIdentity.value
    }
  }
}
