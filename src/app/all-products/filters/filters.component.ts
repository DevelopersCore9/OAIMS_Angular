import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  @Output() filterEvent = new EventEmitter<any>();
  @Output() filterEventColor = new EventEmitter<any>();
  panelOpenState = false;

  constructor() {}

  ngOnInit(): void {}
  navigateToProducts(productType: string) {
    console.log(productType);
    this.filterEvent.emit({ "category": productType });
  }

  navigateToProductsBySubCategory(productSubCategory: string) {
    console.log(productSubCategory);
    this.filterEvent.emit({"subcategory":productSubCategory})

  }

  filterProducts(productColor: string) {
    console.log(productColor);
    this.filterEventColor.emit({ "color": productColor });
  }
}
