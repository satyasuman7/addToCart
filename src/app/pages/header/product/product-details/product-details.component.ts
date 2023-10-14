import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  productDetail: Product | any;

  constructor(private _product: ProductService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let pId = this._route.snapshot.paramMap.get('id');
    pId && this._product.getProductById(Number(pId),).subscribe((res) => {
      this.productDetail = res;
    })
  }
}
