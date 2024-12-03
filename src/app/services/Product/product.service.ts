import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Product } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cartItemList: Product[] = [];
  public productList = new BehaviorSubject<Product[]>([]);
  public search = new BehaviorSubject<string>("");
  public grandTotal: number = 0;

  readonly productUrl = 'https://youva-com-server.onrender.com/products';

  constructor(private _http: HttpClient) { }

  // HOME COMPONENT
  getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.productUrl)
      .pipe(
        catchError(this.handleError)
      );
  }


  // PRODUCTS COMPONENT
  getProductByCategory(category: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.productUrl}?category=${category}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // PRODUCT-DETAILS COMPONENT
  getProductById(id: number): Observable<Product> {
    return this._http.get<Product>(`${this.productUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  getProducts(){
    return this.productList.asObservable()
  }

  addtoCart(product: Product) {
    console.log("Product List ", this.cartItemList);
    const existingProduct = this.cartItemList.find(p => p.id === product.id);
      if (existingProduct) {
        // Product already exists in the cart, increment its quantity
        existingProduct.quantity += 1;
      } 
      else {
        // Product doesn't exist in the cart, add it
        product.quantity = 1; // Set an initial quantity
        this.cartItemList.push(product);
      }
      this.productList.next(this.cartItemList);
  }


  // CART COMPONENT STARTS //
  getTotalPrice(): number {
    return this.cartItemList.reduce((total, product) => total + product.total, 0);
  }

  removeCartItem(product: Product) {
    const index = this.cartItemList.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.cartItemList.splice(index, 1);
      this.productList.next(this.cartItemList);
    }
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
  
  // CART COMPONENT ENDS //

  // function to update the grand total
  updateTotal() {    
    this.grandTotal = this.cartItemList.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }

}
