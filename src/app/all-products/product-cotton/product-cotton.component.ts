import { NavigateProductDataService } from './../../services/navigate-product-data.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FeaturedService } from 'src/app/services/featured.service';

@Component({
  selector: 'app-product-cotton',
  templateUrl: './product-cotton.component.html',
  styleUrls: ['./product-cotton.component.css'],
})
export class ProductCottonComponent implements OnInit {
  public featured: any;
  public productsData: any;
  public id: any;
  public productsDataIf : boolean = false;
  public featuredIf : boolean = false;

  constructor(
    private featuredProducts: FeaturedService,
    private productService : ProductsService,
    public route : ActivatedRoute,
    private navigateService : NavigateProductDataService
    ) {}

  ngOnInit(): void {
      this.productsData = this.navigateService.getData()
      console.log("the product data:",this.productsData)
      console.log(this.productsData.name)
      console.log(this.productsData.images)
      console.log(this.productsData.price)
      console.log(this.productsData.description)
      this.productsDataIf = true;

    this.featuredProducts.getFeaturedProducts().then((data: any) => {
      this.featured = data;
      console.log('Featured :', this.featured);
      this.featuredIf = true;
    });
  }
}
