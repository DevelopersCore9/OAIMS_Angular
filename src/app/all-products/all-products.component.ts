import { FeaturedService } from './../services/featured.service';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  public allProducts : any
  public featured : any
  p: number = 1;
  count: number = 8;
  public param:any;

  constructor(
    private productService : ProductsService,
    private activatedRoute : ActivatedRoute,
    private featuredProducts : FeaturedService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts()
      .then((data:any)=>{
        this.allProducts = data
        console.log("All Products are:", this.allProducts)
      })
      .catch((err)=>{
        console.log(err)
      })

    this.featuredProducts.getFeaturedProducts()
      .then((data:any)=>{
        this.featured = data
        console.log("Featured :",this.featured)
      })

      this.activatedRoute.queryParams.subscribe(params =>{
        console.log('Params',params)
        const countNumber = params.limit
        console.log('Limit is:', countNumber)
      })
  }

}
