import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-fashion',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.scss']
})
export class FashionComponent {
  fashionProduct: Product[] | any;
  constructor(private _product: ProductService) { }

  ngOnInit(): void {
    this._product.getProductByCategory('fashion').subscribe((modbileData) => {
      this.fashionProduct = modbileData;
      this.fashionProduct.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        })
    },
    (error) => {
      console.error('Error fetching products:', error);
      // Handle the error here, e.g., show an error message to the user.
    }
    );
  }
  
  addToCart(product: Product){
    console.log("Adding product to cart:", product);
    this._product.addtoCart(product);
  }
}
