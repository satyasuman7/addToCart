import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/Api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  userData: any;

  constructor(private _api:ApiService, private _router:Router, private _http:HttpClient, private _toastr:ToastrService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  get error() {
    return this.loginForm.controls;
  }

    login(){
      this._http.get<any>('https://youva-com-server.onrender.com/users').subscribe(res => {
      const token = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      })
      if(token){
        if (this.loginForm.value.email === "admin@123") {
          // Admin login
          localStorage.setItem('token', this.loginForm.value.email);
          this._toastr.success('Admin is logged in');
        } else {
          // User login
          localStorage.setItem('token', this.loginForm.value.email);
          this._toastr.success('User is logged in');
        }
        this.loginForm.reset();
        this._router.navigate([""]);
      } else{
        this._toastr.error('User not found !!!');
      }
      }, err => {
        this._toastr.error('Something went Wrong');
      });
    }
}
