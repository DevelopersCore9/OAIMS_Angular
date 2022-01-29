import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'
import {MatCardModule} from '@angular/material/card';
import { AllProductsComponent } from './all-products/all-products.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FiltersComponent } from './all-products/filters/filters.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AboutComponent } from './about/about.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { CartComponent } from './all-products/cart/cart.component';
import { CheckoutComponent } from './all-products/checkout/checkout.component';
import { PaymentComponent } from './all-products/payment/payment.component';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { PlacedOrdersComponent } from './all-products/placed-orders/placed-orders.component';
import { OrdersHistoryComponent } from './all-products/orders-history/orders-history.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BoxPageComponent } from './models/box-page/box-page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatExpansionModule} from '@angular/material/expansion';
import { FilterPipe } from './pipes/filter.pipe';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProductDetailsComponent } from './all-products/product-details/product-cotton.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AllProductsComponent,
    FiltersComponent,
    FavouritesComponent,
    AboutComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    PaymentComponent,
    PlacedOrdersComponent,
    OrdersHistoryComponent,
    BoxPageComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    IvyCarouselModule,
    MatRadioModule,
    HttpClientModule,
    MatDialogModule,
    NgxPaginationModule,
    MatExpansionModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
