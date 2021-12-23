import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Output() filterEvent = new EventEmitter<any>();
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

  navigateToProducts(productType: string) {
    console.log(productType);
    this.filterEvent.emit(productType)
  }

}
