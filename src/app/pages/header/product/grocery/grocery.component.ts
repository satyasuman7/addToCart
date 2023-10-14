import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent {
  groceryProduct: Product[] | any;
  constructor(private _product: ProductService) { }

  ngOnInit(): void {
    this._product.getProductByCategory('grocery').subscribe((groceryData) => {
      this.groceryProduct = groceryData;
      this.groceryProduct.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price })
      });
    },
    (error) => {
      console.error('Error fetching products:', error);
    });
  }
  
  addToCart(product: Product){
    console.log("Adding product to cart:", product);
    this._product.addtoCart(product);
  }
}
