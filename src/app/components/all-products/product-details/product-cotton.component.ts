import { NavigateProductDataService } from './../../../services/navigate-product-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FeaturedService } from 'src/app/services/featured.service';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartNotificationService } from 'src/app/services/cart-notification.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserIdentityService } from 'src/app/services/user-identity.service';
import * as moment from 'moment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-cotton.component.html',
  styleUrls: ['./product-cotton.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  public momentdata = moment;
  public featured: any;
  public productsData: any;
  public id: any;
  public productsDataIf: boolean = false;
  public featuredIf: boolean = false;
  public currentCheckedValue = null;
  public definedColor: any;
  public selectedColor: any | undefined = null;
  public selectedMeter: any | undefined = null;
  public priceCheck = true;
  public selectedPrice: number = 0;
  public productId: any;
  public reviews: any;

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  constructor(
    private featuredProducts: FeaturedService,
    private productService: ProductsService,
    public route: ActivatedRoute,
    private navigateService: NavigateProductDataService,
    private notificationsService: CartNotificationService,
    public router: Router,
    private ren: Renderer2,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
    private reviewService: ReviewService,
    private userIdentityService: UserIdentityService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      // Code to get the new notification data
      // and display it
      console.log('hello', url);
      this.productsData = this.navigateService.getData();
      console.log('the product data:', this.productsData);
      if (this.productsData) {
        this.selectedMeter = this.productsData.size[0];
        this.selectedPrice = this.productsData.price[0];
        this.productsDataIf = true;
      }
    });

    this.route.queryParams.subscribe((params) => {
      console.log(params.product_id);
      this.productId = params.product_id;
      if (!this.productsData) {
        this.productService.getProduct(params.product_id).then((product) => {
          this.productsData = product;
          this.selectedMeter = this.productsData.size[0];
          this.selectedPrice = this.productsData.price[0];
          this.productsDataIf = true;
        });
      }
    });

    this.featuredProducts.getFeaturedProducts().then((data: any) => {
      this.featured = data;
      console.log('Featured :', this.featured);
      this.featuredIf = true;
    });

    this.reviewService
      .getReview(this.productId)
      .then((data: any) => {
        this.reviews = data.reviews;
        console.log('data', data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    this.priceCheck = true;
    console.log(this.priceCheck, 'abc ');
  }

  onRadioButtonChange(event: any) {
    console.log(event.value);
    this.selectedColor = event.value;
  }

  onMeterRadioButtonChange(event: any) {
    console.log(event.value);
    this.priceCheck = !this.priceCheck;
    this.selectedMeter = event.value;
    if (this.priceCheck) {
      this.selectedPrice = this.productsData.price[0];
    } else {
      this.selectedPrice = this.productsData.price[1];
    }
  }

  onCheckout(qty: any) {
    console.log('In product Details', this.selectedColor, this.selectedMeter);
    if (this.selectedColor == null || this.selectedMeter == null) {
      this.openSnackBar('please select the attributes first');
    } else {
      this.navigateService.saveData(this.productsData);
      this.productsData.colorSelected = this.selectedColor;
      this.productsData.quantity = qty;
      this.productsData.selectedSize = this.selectedMeter;
      this.productsData.selectedPrice = this.selectedPrice;
      console.log(this.productsData);
      this.cartService.onCartSave(this.productsData);
      this.notificationsService.changeNotification(1);
      console.log(this.notificationsService.getNotificationValue());
      this.router.navigate(['/all-products']);
      console.log(this.priceCheck);
      console.log(this.productsData.size[0]);
      console.log(this.productsData);
    }
  }

  onFeaturedProductCard(index: any) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.onSameUrlNavigation = 'reload';
    this.navigateService.saveData(this.featured[index]);
    this.router.navigate(['/productDetails']);
  }

  swapImageOnClick(givenIndex: any) {
    let temp = this.productsData.images[0];
    this.productsData.images[0] = this.productsData.images[givenIndex];
    this.productsData.images[givenIndex] = temp;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, ' ', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5 * 1000,
    });
  }

  changePriceRadioButton() {
    this.priceCheck = !this.priceCheck;
  }

  saveReview(message: string, rating: number) {
    let date = moment().toDate();
    let date2 = moment(date).format('MMM DD YYYY');
    console.log(moment(date).format('MMM Do YYYY'));
    console.log(moment(moment().toDate()).fromNow());
    console.log(moment(date2).fromNow());
    console.log(date2);
    let user_name = '';
    let user_obj = this.userIdentityService.onUserGet();
    if (user_obj || user_obj?.name) {
      user_name = user_obj.name;
    }
    console.log({
      id: this.productId,
      reviews: {
        name: user_name,
        review: message,
        rating: rating,
      },
    });
    this.reviewService
      .addReview({
        id: this.productId,
        reviews: {
          name: user_name,
          review: message,
          rating: rating,
          date: moment(moment().toDate()).format('MMM DD YYYY'),
        },
      })
      .then(() => {
        window.location.reload();
      });
  }
}
