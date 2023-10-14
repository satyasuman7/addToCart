import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  searchsuject = new Subject();

  postData(data: any):Observable<any>{
    return this._http.post('http://localhost:3000/users', data);
  }

  getData(){
    return this._http.get('http://localhost:3000/users');
  }

  IsLoggedIn(){
    return localStorage.getItem('token');
  }

  isAdminLoggedIn(){
    return localStorage.getItem('');
  }
}
