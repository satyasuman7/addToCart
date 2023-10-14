import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/Api/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  userData: any;
  constructor(private _api:ApiService){}
  
  ngOnInit(): void {
    this._api.getData().subscribe((res)=>{
      this.userData = res;
    })
  }
}
