import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export default class JwtDecode {
  helper = new JwtHelperService();

  constructor(
  ) { }

  // Function to get the base64 string agaist a given picture
  decodedToken(token: any) {
    return this.helper.decodeToken(token);
  }
}
