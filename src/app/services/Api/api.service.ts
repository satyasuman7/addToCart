import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  searchsuject = new Subject();
  // readonly url = "http://localhost:3000";
  readonly url = "https://youva-com-server.onrender.com";

  // POST (ADD) DETAILS
  postData(data: any): Observable<any> {
    return this._http.post(`${this.url}/users`, data);
  }

  // GET DETAILS
  getData() {
    return this._http.get(`${this.url}/users`);
  }

  //GET PARTICULAR DETAIL AFTER GETTING LOGIN
  getparticularData(Email: any): Observable<any> {
    const url2 = `${this.url}/users?email=${Email}`;
    console.log("The url ", url2)
    return this._http.get(url2);
  }

  // DELETE DETAILS
  deleteData(id: number) {
    return this._http.delete(`${this.url}/users/${id}`);
  }

  // UPDATE DETAILS
  updateData(id: number, data: any): Observable<any> {
    return this._http.put(`${this.url}/users/${id}`, data);
  }

  // ADD NEW PRODUCTS
  addNewProduct(productData: Product): Observable<Product> {
    return this._http.post<Product>(`${this.url}/products`, productData);
  } 

  // GET TOKEN
  IsLoggedIn() {
    return localStorage.getItem('token');
  }
}
