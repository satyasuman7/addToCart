import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private _api:ApiService, private _toastr:ToastrService, private _router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    if(this._api.IsLoggedIn()){
      return true;
    }
    else{
      this._toastr.info("Login first");
      this._router.navigate(['login']);
      return false;
    }
  }
  
}

// zoom  transform: scale(1.2);