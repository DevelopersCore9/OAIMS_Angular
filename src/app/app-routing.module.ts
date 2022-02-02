import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacedOrdersComponent } from './components/all-products/placed-orders/placed-orders.component';
import { OrdersHistoryComponent } from './components/all-products/orders-history/orders-history.component';
import { PaymentComponent } from './components/all-products/payment/payment.component';
import { CheckoutComponent } from './components/all-products/checkout/checkout.component';
import { CartComponent } from './components/all-products/cart/cart.component';
import { ProductDetailsComponent } from './components/all-products/product-details/product-cotton.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'all-products',
    component: AllProductsComponent,
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
    path: 'productDetails',
    component: ProductDetailsComponent
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
    component: PlacedOrdersComponent
  },
  {
    path: 'orders-history',
    component: OrdersHistoryComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
