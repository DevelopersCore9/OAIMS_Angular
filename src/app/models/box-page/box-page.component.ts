import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-page',
  templateUrl: './box-page.component.html',
  styleUrls: ['./box-page.component.css']
})
export class BoxPageComponent implements OnInit {
  public box: any;
  standardPackage:boolean = true
  PremiumPackage:boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  standardRadioEvent(){
    this.standardPackage = !this.standardPackage;
  }
  prmiumRadioEvent(){
    this.PremiumPackage = !this.PremiumPackage;
  }
}
