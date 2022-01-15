import { NavigateProductDataService } from './../../services/navigate-product-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FeaturedService } from 'src/app/services/featured.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-cotton',
  templateUrl: './product-cotton.component.html',
  styleUrls: ['./product-cotton.component.css'],
})
export class ProductCottonComponent implements OnInit {
  public featured: any;
  public productsData: any;
  public id: any;
  public productsDataIf: boolean = false;
  public featuredIf: boolean = false;
  public currentCheckedValue = null
  public definedColor: any;
  public selectedColor: any
  public selectedMeter: any
  constructor(
    private featuredProducts: FeaturedService,
    private productService: ProductsService,
    public route: ActivatedRoute,
    private navigateService: NavigateProductDataService,
    public router: Router,
    private ren: Renderer2,
    private cartService: CartService
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
    this.navigateService.saveData(this.productsData)
    this.router.navigate(['/checkout'])
    this.productsData.color = this.selectedColor
    this.productsData.quantity = qty
    this.productsData.size = this.selectedMeter
    console.log(this.productsData);

    this.cartService.onCartSave(this.productsData);
  }
  onSaveSamePage(index: any) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.navigateService.saveData(this.featured[index])
    this.router.navigate(['/productCotton'])
  }
  swapImageOnClick(givenIndex: any) {
    let temp = this.productsData.images[0]
    this.productsData.images[0] = this.productsData.images[givenIndex]
    this.productsData.images[givenIndex] = temp
  }

}
