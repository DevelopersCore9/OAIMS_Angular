import { FiltersComponent } from './filters/filters.component';
import { FeaturedService } from './../services/featured.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductsService } from './../services/products.service';
import { Component, Input, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  @Input('childToMaster') masterName: string | any;
  @ViewChild(FiltersComponent, { static: true }) child: FiltersComponent | any;

  public allProducts: any
  public featured: any
  p: number = 1;
  count: number = 8;
  public param: any;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private featuredProducts: FeaturedService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
   }

  // Get Data or Category Name from Child
  getValuesFromFilters($event: any) {
    console.log($event);
    this.productService.CustomProductsCategory($event)
      .subscribe((data) => {
        console.log(data);
        this.allProducts = data
        console.log("all Cotton products are:", this.allProducts)
        this.ref.detectChanges()
      })
    // .then((data) =>{
    //   console.log(data);
    //   this.allProducts = data
    //   console.log("all Cotton products are:",this.allProducts)
    //   this.ref.detectChanges()

    // })
    // .catch((err) =>{
    //   console.log(err);

    // })
  }

  ngOnInit(): void {
    this.productService.getAllProducts()
      .then((data: any) => {
        this.allProducts = data
        console.log("All Products are:", this.allProducts)
      })
      .catch((err) => {
        console.log(err)
      })

    this.featuredProducts.getFeaturedProducts()
      .then((data: any) => {
        this.featured = data
        console.log("Featured :", this.featured)
      })

    this.activatedRoute.queryParams.subscribe(params => {
      console.log('Params', params)
      const countNumber = params.limit
      console.log('Limit is:', countNumber)
    })
  }

}
