import { ProductCottonComponent } from './all-products/product-cotton/product-cotton.component';
import { AboutComponent } from './about/about.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '',
    pathMatch: 'full',
    redirectTo : '/home'
  },
  {
    path: 'home',
    component : HomeComponent
  },
  {
    path: 'all-products',
    component: AllProductsComponent
  },
  {
    path: 'favourites',
    component: FavouritesComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'productCotton',
    component: ProductCottonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
