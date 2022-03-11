import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-box-page',
  templateUrl: './box-page.component.html',
  styleUrls: ['./box-page.component.css'],
})
export class BoxPageComponent implements OnInit {
  public box: any;
  standardPackage: boolean = true;
  PremiumPackage: boolean = false;
  selected: number = 0;
  public packageButton: any;
  public isSample = true;
  constructor(
    private cartService: CartService,
    public dialogRef: MatDialogRef<BoxPageComponent>
  ) {}

  ngOnInit(): void {}

  standardRadioEvent() {
    this.standardPackage = !this.standardPackage;
    if (this.standardPackage == true) {
      this.selected = 0;
    } else {
      this.selected = 1;
    }
  }
  prmiumRadioEvent() {
    this.PremiumPackage = !this.PremiumPackage;
    if (this.PremiumPackage == true) {
      this.selected = 1;
    } else {
      this.selected = 0;
    }
  }

  onPackageRadioButtonchange(event: any) {
    console.log(event);
    this.packageButton = event.target.value;
    console.log(this.packageButton);
  }

  saveSampleClick(event: any) {
    console.log(event);
    this.isSample = event.checked;
  }

  closeDialog() {
    this.dialogRef.close({ package: this.selected, sample: this.isSample });
  }
}
