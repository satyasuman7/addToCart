import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/Api/api.service';
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

  constructor(private _product:ProductService, private _router:Router, private _toastr:ToastrService, private _api:ApiService, private _modalService: NgbModal, private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this._product.getProducts().subscribe((res) => {
      this.totalItem = res.length
    });

    this.productFormData();
    this.addnewProduct();
  }

  // SEARCH PRODUCT
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this._product.search.next(this.searchTerm);
  }

  // GET TOKEN
  loggedIn(){
    return localStorage.getItem('token');
  }

  // Function to check if the user is an admin
  isAdmin() {
    const token = localStorage.getItem("token");
    return token === "admin@123";
  }
  getAdmin():string|null{
    if(this.isAdmin()){
      return 'admin@123';
    }
    else{
      return null;
    }
  }

  // Logout function to remove token
  onLogout(){
    localStorage.removeItem('token');
    this._toastr.success("Logout Successfully !!");
    this._router.navigate([""]);
  }

  // ADD Product form
  closeResult: string = '';
  productForm: FormGroup | any;
  errorMessage: string | undefined;

  productFormData() {
    this.productForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      prePrice: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    })
  }
  get error() {
    return this.productForm.controls;
  }

  addnewProduct() {
    if(this.productForm.valid){
      const productData = this.productForm.value;
      this._api.addNewProduct(productData).subscribe((res:any) =>{
        this._toastr.success('Product saved successfully');
        this._router.navigate([""]);
        window.location.reload();
      })
    }
  }

  // //************************** MODAL FORM STARTS ***********************//
  openAddNewProudct(content: any) {
    this._modalService.open(content,
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed:${this.getDismissionReason(reason)}`;
        });
  }

  private getDismissionReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }
    else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    else {
      return `with: ${reason}`;
    }
  }
  // //************************** MODAL FORM ENDS ***********************//
}
