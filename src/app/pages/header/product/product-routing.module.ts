import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceryComponent } from './grocery/grocery.component';
import { MobileComponent } from './mobile/mobile.component';
import { FashionComponent } from './fashion/fashion.component';
import { ToysComponent } from './toys/toys.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path:"",
    children: [
      {path:"grocery", component:GroceryComponent},
      {path:"electronics", component:MobileComponent},
      {path:"fashion", component:FashionComponent},
      {path:"toys", component:ToysComponent},
      {path: ':category/:id', component: ProductDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
