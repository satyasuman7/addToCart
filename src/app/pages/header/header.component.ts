import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public totalItem: number = 0;
  public searchTerm : string="";
  collapsed = true;

  constructor(private _product:ProductService, private _router:Router, private _toastr:ToastrService) { }

  ngOnInit(): void {
    this._product.getProducts().subscribe((res) => {
      this.totalItem = res.length
    })
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this._product.search.next(this.searchTerm);
  }

  loggedIn(){
    return localStorage.getItem('token');
  }

  onLogout(){
    localStorage.removeItem('token');
    this._toastr.success("Logout Successfully !!");
    this._router.navigate([""]);
  }
}
