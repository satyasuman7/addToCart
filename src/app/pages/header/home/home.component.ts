import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/Product/product.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from 'src/app/guard/Auth/auth.guard';
import { ApiService } from 'src/app/services/Api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent {
  productList: Product[] = [];
  searchKey:string="";
  images = [
    '../../../../assets/images/ban1.jpg', 
    '../../../../assets/images/ban2.jpg',
    '../../../../assets/images/ban3.jpg',
    '../../../../assets/images/ban4.jpg',
  ];


  constructor(private _product: ProductService, private _router: Router, private _auth:AuthGuard, private _api:ApiService, private _toastr:ToastrService) { }

  ngOnInit(): void {
    this._product.getAllProducts().subscribe(
      (pData) => {
        this.productList = pData;
        
        this.productList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price });
        })
      },
      (error) => {
        console.error('Error fetching products:', error);
        // Handle the error here, e.g., show an error message to the user.
      }
    );

    this._product.search.subscribe((val:any)=>{
      this.searchKey = val;
    });
    // this._product.getProducts();
  }

  // FUNCTION TO ADD THE ITEM TO CART
  addToCart(product: Product) {
    console.log("Adding product to cart:", product);
    // If login then it add to cart other show message login first
    if(this._api.IsLoggedIn()){
      this._product.addtoCart(product);
      this._router.navigate(['cart']);
    }
    else{
      this._toastr.info("Login first");
      this._router.navigate(['login']);
    }
  }
}
