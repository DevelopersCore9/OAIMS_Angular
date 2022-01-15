import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-box-page',
  templateUrl: './box-page.component.html',
  styleUrls: ['./box-page.component.css']
})
export class BoxPageComponent implements OnInit {
  public box: any;
  standardPackage:boolean = true
  PremiumPackage:boolean = false
  selected:number = 0
  public packageButton : any
  constructor(
    private cartService : CartService
  ) { }

  ngOnInit(): void {
  }

  standardRadioEvent(){
    this.standardPackage = !this.standardPackage;
    if(this.standardPackage == true) {
      this.selected = 0
    }
    else{
      this.selected = 1
    }
  }
  prmiumRadioEvent(){
    this.PremiumPackage = !this.PremiumPackage;
    if(this.PremiumPackage == true) {
      this.selected = 1
    }
    else{
      this.selected = 0
    }
  }

  onPackageRadioButtonchange(event:any){
    this.packageButton = event.target.value;
    console.log(this.packageButton)
  }
}
