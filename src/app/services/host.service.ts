import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  // ip: string = "http://192.168.18.25:3000";
  ip: string = "http://localhost:3000";

  constructor() { }

  getHostIp(){
    return this.ip;
  }
}
