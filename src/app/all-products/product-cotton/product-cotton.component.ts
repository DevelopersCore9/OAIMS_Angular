import { Component, OnInit } from '@angular/core';
import { FeaturedService } from 'src/app/services/featured.service';

@Component({
  selector: 'app-product-cotton',
  templateUrl: './product-cotton.component.html',
  styleUrls: ['./product-cotton.component.css'],
})
export class ProductCottonComponent implements OnInit {
  public featured: any;
  constructor(private featuredProducts: FeaturedService) {}

  ngOnInit(): void {
    this.featuredProducts.getFeaturedProducts().then((data: any) => {
      this.featured = data;
      console.log('Featured :', this.featured);
    });
  }
}
