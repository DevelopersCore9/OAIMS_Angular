import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from '../services/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public homeData : any
  public carouselImages : any
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
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }

  isViewMore = false
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {

    this.homeService.findAll()
    .then((data:any) => {
      this.homeData = data;
      console.log("data:", this.homeData);
    })
    .catch((err)=>{
      console.log(err);
    })

    this.homeService.getCarouselImages()
      .then((data:any) => {
        this.carouselImages = data;
        console.log("Carousel Images:", this.carouselImages);
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  showCard() {
    return this.isViewMore = !this.isViewMore
  }
}
