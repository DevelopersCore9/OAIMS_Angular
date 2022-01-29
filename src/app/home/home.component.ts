import { Observable } from 'rxjs';
import { BannersService } from './../services/banners.service';
import { CarouselService } from './../services/carousel.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from '../services/home.service';
import { NavigateProductDataService } from '../services/navigate-product-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public homeData: any;
  public homeDataIf: boolean = false;
  public carouselImages: any = [];
  public carouselImagesIf: boolean = false;
  public collectionData: any;
  public banner: any = [];
  public bannerIf: boolean = false;
  public topSelling: any;
  public categoriesImages: any;
  public categoriesData: any;
  isViewMore = false;
  public viewCount = 3;


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: true,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private productService: ProductsService,
    private carouselService: CarouselService,
    private bannerService: BannersService,
    private navigateService: NavigateProductDataService
  ) { }

  ngOnInit(): void {
    this.homeService
      .SliderData()
      .then((data: any) => {
        this.homeData = data;
        this.homeDataIf = true;
        console.log('data:', this.homeData);
      })
      .catch((err) => {
        console.log(err);
      });

    this.homeService
      .getCollectionData()
      .then((data: any) => {
        this.collectionData = data;
        console.log('Collection Data', this.collectionData);
      })
      .catch((err) => {
        console.log(err);
      });

    this.homeService.getCategories()
      .then((data: any) => {
        this.categoriesData = data;
        console.log("all categories", this.categoriesData);
      })
      .catch((err) => {
        console.log(err);
      })
    // this.bannerService
    //   .getCategoriesImages()
    //   .then((data: any) => {
    //     this.categoriesImages = data;
    //     console.log('Images of categories:', this.categoriesImages);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });


    this.bannerService
      .getBanner()
      .then((data: any) => {
        this.banner = data;
        this.bannerIf = true;
        console.log('Banner:', this.banner);
      });

    this.productService.getTopSelling().then((data: any) => {
      this.topSelling = data;
      console.log('Banner:', this.topSelling);
    });

    this.carouselService
      .getCarouselImages()
      .then((data: any) => {
        this.carouselImages = data;
        this.carouselImagesIf = true
        console.log('Carousel Images:', this.carouselImages);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  navigateToProducts() {
    this.router.navigate(['/all-products']);
  }

  showCard() {
    // this.viewCount == 3 ? this.categoriesData.length : 3
    // console.log(this.viewCount)
    if (this.viewCount == this.categoriesData.length) {
      this.viewCount = 3
    }
    else {
      this.viewCount = this.categoriesData.length;
    }
    return (this.isViewMore = !this.isViewMore);
  }

  onSave(index: any) {
    this.navigateService.saveData(this.homeData[index])
    this.router.navigate(['/productDetails'], index);
  }
  onCategory(name: string) {
    this.router.navigate(['/all-products', { "product": name }])
  }


}
