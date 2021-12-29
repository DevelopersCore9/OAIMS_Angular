import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigateProductDataService {
  public ProductData : any
  constructor() { }

  saveData(obj:any){
    this.ProductData = obj
    console.log(this.ProductData)
  }
  getData(){
   return this.ProductData;
  }
}
