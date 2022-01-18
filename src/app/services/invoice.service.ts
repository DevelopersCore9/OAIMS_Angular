import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public paymentItemData : any;
  constructor() { }

  savePaymentItems(itemData: any){
    this.paymentItemData = itemData;
  }

  getPaymentItems(){
    return this.paymentItemData
  }
}
