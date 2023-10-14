import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/Product/product.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent {
  productList: Product[] = [];
  searchKey:string="";
  public grandTotal: number = 0;
  images = [
    '../../../../assets/images/ban1.jpg', 
    '../../../../assets/images/ban2.jpg',
    '../../../../assets/images/ban3.jpg',
    '../../../../assets/images/ban4.jpg',
  ];


  constructor(private _product: ProductService, private _router: Router) { }

  ngOnInit(): void {
    this._product.getAllProducts().subscribe(
      (pData) => {
        this.productList = pData;
        
        this.productList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        })
      },
      (error) => {
        console.error('Error fetching products:', error);
        // Handle the error here, e.g., show an error message to the user.
      }
    );

    this._product.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  addToCart(product: Product) {
    debugger;
    console.log("Adding product to cart:", product);
    this._product.addtoCart(product);
    // this.updateTotal();
    this._router.navigate(['cart']);
  }

  // updateTotal() {
  //   this.grandTotal = this.productList.reduce((total, product) => {
  //     return total + product.price * product.quantity;
  //   }, 0);
  // }
}
