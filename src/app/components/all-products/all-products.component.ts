import { SpinnerService } from './../../services/spinner.service';
import { CartNotificationService } from './../../services/cart-notification.service';
import { NavigateProductDataService } from './../../services/navigate-product-data.service';
import { FiltersComponent } from './filters/filters.component';
import { FeaturedService } from './../../services/featured.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { map } from 'rxjs/operators';

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
  public getQueryGetProduct: string | any;
  public param: any;
  public subCategory: any;
  public searchkey: string = '';
  public colorFilters: any = [];
  public categoryName: any;
  public spin: any;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private featuredProducts: FeaturedService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private navigateService: NavigateProductDataService,
    private notificationsService: CartNotificationService,
    private spinnerService: SpinnerService,
    private cdr: ChangeDetectorRef
  ) {
    // this.spinnerService.changeSpinnerState(true);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.getQueryGetProduct =
      this.activatedRoute.snapshot.paramMap.get('product');
    console.log(this.getQueryGetProduct);
    if (this.getQueryGetProduct) {
      this.categoryName = this.getQueryGetProduct;
      this.productService
        .CustomProductsCategory(this.getQueryGetProduct)
        .subscribe((data) => {
          console.log(data);
          if (data) {
            this.allProducts = data;
            console.log('all Cotton products are:', this.allProducts);
          }
        });
    }

    // Default Loading Data of Cotton Products
    if (!this.getQueryGetProduct) {
      this.categoryName = 'cotton';
      this.productService.CustomProductsCategory('cotton').subscribe((data) => {
        console.log(data);
        this.categoryName = 'cotton';
        this.allProducts = data;
        console.log('all Cotton products are:', this.allProducts);
        this.allProducts = this.allProducts.sort(
          (low: any, high: any) => low.Price - high.Price
        );
      });
    }

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

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.spinnerService.changeSpinnerState(false);
    // }, 2000);

    this.cdr.detectChanges();
  }

  // Get Data or Category Name from Child
  getValuesFromFilters($event: any) {
    if ($event.category) {
      this.categoryName = $event.category;
      this.productService
        .CustomProductsCategory($event.category)
        .subscribe((data) => {
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
      this.colorFilters = this.colorFilters.filter(
        (color: any) => color !== $event.color
      );
      console.log(this.colorFilters);
    } else {
      this.colorFilters.push($event.color);
    }
    this.allProducts = this.allProducts
      .filter((product: any) =>
        product.color.some((color: any) =>
          this.colorFilters.some((c: any) => c === color)
        )
      )
      .map((product: any) => product);
    console.log('asdasdasdas', this.allProducts);

    // console.log("elements", this.allProducts = this.allProducts.filter((product: any) => product.color.includes($event.color)))
    // console.log("The array", this.allProducts)
  }

  onDataSelection(index: any) {
    this.navigateService.saveData(this.allProducts[index]);
    this.router.navigate(['/productDetails'], {
      queryParams: { product_id: this.allProducts[index]._id },
    });
  }

  onFeatureDataSelection(index: any) {
    this.navigateService.saveData(this.featured[index]);
    this.router.navigate(['/productDetails'], {
      queryParams: { product_id: this.featured[index]._id },
    });
  }

  getValuesFromFilterBySubCategory($event: any) {
    this.productService.CustomProductsSubCategory($event).subscribe((data) => {
      console.log(data);
      this.subCategory = data;
      this.ref.detectChanges();
    });
  }

  sort(event: any) {
    switch (event.target.value) {
      case 'Low': {
        this.allProducts = this.allProducts.sort(
          (low: any, high: any) => low.Price - high.Price
        );
        break;
      }

      case 'High': {
        this.allProducts = this.allProducts.sort(
          (low: any, high: any) => high.Price - low.Price
        );
        break;
      }

      case 'Name': {
        this.allProducts = this.allProducts.sort(function (
          low: any,
          high: any
        ) {
          if (low.Name < high.Name) {
            return -1;
          } else if (low.Name > high.Name) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      }

      default: {
        this.allProducts = this.allProducts.sort(
          (low: any, high: any) => low.Price - high.Price
        );
        break;
      }
    }
    return this.allProducts;
  }

  capitalize(cat_name: string) {
    return cat_name[0].toUpperCase() + cat_name.slice(1);
  }
}
