import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  public products: Product[] = [];
  public grandTotal: number = 0;
  private cartSubscription: Subscription | undefined;

  constructor(private _product: ProductService) { }

  ngOnInit(): void {
    this._product.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this._product.getTotalPrice();
    });
  }

  // getCartTotal(): number {
  //   return this.products.reduce((total, product) => total + (product.price * product.quantity), 0);
  // }
  // calculateGrandTotal(): number {
  //   return this.products.reduce((total, product) => total + product.total, 0);
  // }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  removeItem(item: Product) {
    this._product.removeCartItem(item);
  }

  emptyCart() {
    this._product.removeAllCart();
  }

  

   // Function to increase the quantity
   increaseQuantity(product: Product) {
      product.quantity += 1;
      // this.updateTotal();
      this.updateTotal();
    }

  // Function to decrease the quantity
  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      // this.updateTotal();
      this.updateTotal();
    } 
    else{
      this._product.removeCartItem(product);
    }
  }
  // Function to update the total
  updateTotal() {
    this.grandTotal = this.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }
}
