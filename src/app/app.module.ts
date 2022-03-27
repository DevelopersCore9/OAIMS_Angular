import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './components/auth/auth.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FiltersComponent } from './components/all-products/filters/filters.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { AboutComponent } from './components/about/about.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CartComponent } from './components/all-products/cart/cart.component';
import { CheckoutComponent } from './components/all-products/checkout/checkout.component';
import { PaymentComponent } from './components/all-products/payment/payment.component';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { PlacedOrdersComponent } from './components/all-products/placed-orders/placed-orders.component';
import { OrdersHistoryComponent } from './components/all-products/orders-history/orders-history.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BoxPageComponent } from './models/box-page/box-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatExpansionModule } from '@angular/material/expansion';
import { FilterPipe } from './pipes/filter.pipe';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductDetailsComponent } from './components/all-products/product-details/product-cotton.component';
import { ImageDirective } from './directives/image.directive';
import { FeaturedImagesDirective } from './directives/featured-images.directive';
import { SpinnerComponent } from './helper/spinner/spinner.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerDirective } from './directives/spinner.directive';

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
    ImageDirective,
    FeaturedImagesDirective,
    SpinnerComponent,
    SpinnerDirective
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
    MatButtonModule,
    MatDialogModule,
    NgxPaginationModule,
    MatExpansionModule,
    MatBadgeModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
