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
  public total:number=0;
  public grandTotal: number = 0;
  private cartSubscription: Subscription | undefined;

  constructor(private _product: ProductService) { }

  ngOnInit(): void {
    this._product.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this._product.getTotalPrice();
      this.total = this._product.getTotalPrice();
    });

    this.updateTotal();
  }

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
    const oldQuantity = product.quantity;
      product.quantity += 1;
      // this.updateTotal();
      this.updateTotal();
      // Check if the quantity is increased
      if (oldQuantity < product.quantity) {
        this.itemTotal(product);
      }
  }

  // Function to decrease the quantity
  decreaseQuantity(product: Product) {    
    const oldQuantity = product.quantity;
    if (product.quantity > 1) {
      product.quantity -= 1;
      // this.updateTotal();
      this.updateTotal();
      // Check if the quantity is decreased
      if (oldQuantity > product.quantity) {
        this.itemTotal(product);
      }
    } 
    else{
      this._product.removeCartItem(product);
    }
  }  

  // Function to update the grand total
  updateTotal() {
    this.grandTotal = this.products.reduce((total, product) => {
      return total += product.price * product.quantity;
    }, 0);
  }

  // Function to update the item total
  itemTotal(product: Product) {
    this.total = product.price * product.quantity;
  }
}
