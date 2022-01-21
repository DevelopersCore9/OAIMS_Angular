import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartNotificationService } from '../services/cart-notification.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public searchTerm: string = '';
  public cartCount: number = 0;
  public allCategoriesName: any;
  constructor(
    private notificationService: CartNotificationService,
    private categoriesService: CategoriesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.notificationService.currentNotification
      .subscribe((data) => {
        this.cartCount = data
      })

    this.categoriesService.getCategoriesName()
      .then((data: any) => {
        this.allCategoriesName = data;
        console.log("all names of categories", this.allCategoriesName)
        console.log("CATEGORY:", this.allCategoriesName.categoryName)
      })
      .catch((err: any) => {
        console.log(err);
      })
  }
  onCategory(name: string) {
    this.router.navigate(['/all-products', { "product": name }])
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
  }
}
