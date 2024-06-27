import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './pipes/filter.pipe';
import { ToastrModule } from 'ngx-toastr';

// Firebase services + environment module
// import {AngularFireModule} from '@angular/fire/compat';
// import {AngularFireAuthModule} from '@angular/fire/compat/auth';
// import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
// import { environment } from 'src/environments/environment';
// import { NgOtpInputModule } from 'ng-otp-input'; // npm i ng-otp-input
import { ImageUploadService } from './services/ImageUpload/image-upload.service';

// Only Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { HomeComponent } from './pages/header/home/home.component';
import { CartComponent } from './pages/header/cart/cart.component';
import { AboutComponent } from './pages/header/about/about.component';
import { ContactComponent } from './pages/header/contact/contact.component';
import { SignupComponent } from './pages/header/signup/signup.component';
import { LoginComponent } from './pages/header/login/login.component';
import { UserDetailsComponent } from './pages/header/user-details/user-details.component';
import { MyProfileComponent } from './pages/header/my-profile/my-profile.component';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot(),
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    // NgOtpInputModule
  ],
  providers: [ImageUploadService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
