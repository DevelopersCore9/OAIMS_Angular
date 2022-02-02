import { NavigateProductDataService } from './../../../services/navigate-product-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FeaturedService } from 'src/app/services/featured.service';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartNotificationService } from 'src/app/services/cart-notification.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-cotton.component.html',
  styleUrls: ['./product-cotton.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  public featured: any;
  public productsData: any;
  public id: any;
  public productsDataIf: boolean = false;
  public featuredIf: boolean = false;
  public currentCheckedValue = null
  public definedColor: any;
  public selectedColor: any | undefined = null;
  public selectedMeter: any | undefined = null

  constructor(
    private featuredProducts: FeaturedService,
    private productService: ProductsService,
    public route: ActivatedRoute,
    private navigateService: NavigateProductDataService,
    private notificationsService: CartNotificationService,
    public router: Router,
    private ren: Renderer2,
    private cartService: CartService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {


    this.route.url.subscribe(url => {
      // Code to get the new notification data
      // and display it
      console.log("hello")
      this.productsData = this.navigateService.getData()
      console.log("the product data:", this.productsData)
      this.productsDataIf = true;
    });


    this.featuredProducts.getFeaturedProducts().then((data: any) => {
      this.featured = data;
      console.log('Featured :', this.featured);
      this.featuredIf = true;
    });
  }

  onRadioButtonChange(event: any) {
    console.log(event.value);
    this.selectedColor = event.value
  }

  onMeterRadioButtonChange(event: any) {
    console.log(event.value);
    this.selectedMeter = event.value
  }

  onCheckout(qty: any) {
    console.log("In product Details", this.selectedColor, this.selectedMeter)
    if (this.selectedColor == null || this.selectedMeter == null) {
      this.openSnackBar("please select the attributes first")
    } else {
      this.navigateService.saveData(this.productsData)
      this.productsData.colorSelected = this.selectedColor
      this.productsData.quantity = qty
      this.productsData.size = this.selectedMeter
      console.log(this.productsData);
      this.cartService.onCartSave(this.productsData);
      this.notificationsService.changeNotification(1);
      console.log(this.notificationsService.getNotificationValue());
      this.router.navigate(['/checkout'])
    }
  }
  onFeaturedProductCard(index: any) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.navigateService.saveData(this.featured[index])
    this.router.navigate(['/productDetails'])
  }
  swapImageOnClick(givenIndex: any) {
    let temp = this.productsData.images[0]
    this.productsData.images[0] = this.productsData.images[givenIndex]
    this.productsData.images[givenIndex] = temp
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, " ", {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 5 * 1000,
    });
  }
}
