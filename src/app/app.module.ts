import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './pipes/filter.pipe';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/header/home/home.component';
import { CartComponent } from './pages/header/cart/cart.component';
import { AboutComponent } from './pages/header/about/about.component';
import { ContactComponent } from './pages/header/contact/contact.component';
import { SignupComponent } from './pages/header/signup/signup.component';
import { LoginComponent } from './pages/header/login/login.component';
import { UserDetailsComponent } from './pages/header/user-details/user-details.component';
import { MyProfileComponent } from './pages/header/my-profile/my-profile.component';
import { HdComponent } from './header/hd/hd.component';
// import { ProductDetailsComponent } from './pages/header/product-details/product-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PagenotfoundComponent,
    HomeComponent,
    CartComponent,
    FilterPipe,
    AboutComponent,
    ContactComponent,
    SignupComponent,
    LoginComponent,
    UserDetailsComponent,
    MyProfileComponent,
    HdComponent,
    // ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
