import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  productDetail: Product | any;

  constructor(private _product: ProductService, private _route: ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    let pId = this._route.snapshot.paramMap.get('id');
    pId && this._product.getProductById(Number(pId),).subscribe((res) => {
      this.productDetail = res;
    })
  }

  // FUNCTION TO ADD THE ITEM TO CART
  addToCart(product: Product) {
    console.log("Adding product to cart:", product);
    this._product.addtoCart(product);
    this._router.navigate(['cart']);
  }
}
