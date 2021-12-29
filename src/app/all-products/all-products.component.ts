import { NavigateProductDataService } from './../services/navigate-product-data.service';
import { FiltersComponent } from './filters/filters.component';
import { FeaturedService } from './../services/featured.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductsService } from './../services/products.service';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  @ViewChild(FiltersComponent, { static: true }) child: FiltersComponent | any;
  @ViewChild(FiltersComponent, { static: true }) subchild:
    | FiltersComponent
    | any;

  public allProducts: any;
  public featured: any;
  p: number = 1;
  count: number = 8;
  public param: any;
  public subCategory: any;
  public searchkey: string = "";
  public colorFilters: any = [];
  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private featuredProducts: FeaturedService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private navigateService: NavigateProductDataService
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
  }
  // Get Data or Category Name from Child
  getValuesFromFilters($event: any) {
    if ($event.category) {
      this.productService.CustomProductsCategory($event.category).subscribe((data) => {
        console.log(data);
        this.allProducts = data;
        console.log('all Cotton products are:', this.allProducts);
        this.ref.detectChanges();
      });
    } else {
      this.productService
        .CustomProductsSubCategory($event.subcategory)
        .subscribe((data) => {
          this.allProducts = data;
          console.log('all Cotton products are:', this.allProducts);
          this.ref.detectChanges();
        });
    }
  }
  getColorsFromFilters($event: any) {
    console.log($event);
    if (this.colorFilters.includes($event.color)) {
      this.colorFilters = this.colorFilters.filter((color:any)=> color !== $event.color);
      console.log(this.colorFilters)
    }
    else {
      this.colorFilters.push($event.color)
    }
    console.log("elements",this.allProducts = this.allProducts.some((product:any)=> product.color.includes($event.color)))
    console.log("The array", this.allProducts)
  }
  onSave(index: any) {
    this.navigateService.saveData(this.allProducts[index])
    this.router.navigate(['/productCotton', index])
  }
  getValuesFromFilterBySubCategory($event: any) {
    this.productService.CustomProductsSubCategory($event).subscribe((data) => {
      console.log(data);
      this.subCategory = data;
      this.ref.detectChanges();
    });
  }
  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .then((data: any) => {
        this.allProducts = data;
        console.log('All Products are:', this.allProducts);
      })
      .catch((err) => {
        console.log(err);
      });

    this.featuredProducts.getFeaturedProducts().then((data: any) => {
      this.featured = data;
      console.log('Featured :', this.featured);
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('Params', params);
      const countNumber = params.limit;
      console.log('Limit is:', countNumber);
    });
  }
}
