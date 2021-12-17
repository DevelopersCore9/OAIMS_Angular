import { OrdersHistoryComponent } from './all-products/orders-history/orders-history.component';
import { PlacedOrdersComponent } from './all-products/placed-orders/placed-orders.component';
import { ProductCottonComponent } from './all-products/product-cotton/product-cotton.component';
import { AboutComponent } from './about/about.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './all-products/cart/cart.component';
import { CheckoutComponent } from './all-products/checkout/checkout.component';
import { PaymentComponent } from './all-products/payment/payment.component';

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
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'placed-orders',
    component:PlacedOrdersComponent
  },
  {
    path: 'orders-history',
    component:OrdersHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
