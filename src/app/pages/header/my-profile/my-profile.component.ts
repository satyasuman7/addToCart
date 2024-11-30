import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { variableModel } from 'src/app/model/variables.model';
import { ApiService } from 'src/app/services/Api/api.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  userData:any;
  profileFormModel!: FormGroup;
  userObj:variableModel = new variableModel;
  constructor(private _api:ApiService, private _modalService: NgbModal, private _toastr:ToastrService){
    this.profileFormModel = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.userObj.numberRegEx), Validators.maxLength(10), Validators.minLength(10)]),
      premium: new FormControl('', [Validators.required]),
      offer: new FormControl([], [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      status: new FormControl(false)
    })
  }
  
  ngOnInit(){
    this.getDetails();


    const email = localStorage.getItem('token');
    console.log(email);
    if (email) {
      // Fetch the userDetails by 'email'
      this._api.getparticularData(email).subscribe(res => {
        // Access and store the specific data from userDetails
        this.userData = res[0];
        console.log('User Data:', this.userData);
      },
      (error: any)=>{
        console.error('Error fetching user details', error);
      })
    }
    // 
  }

  // GET DETAILS OF USERS
  getDetails() {
    this._api.getData().subscribe((res)=>{
      this.userData = res;
    })
  }

  // UPDATE DETAILS OF USERS //
  updateEmp: any = {
    id: 0,
    Fullname: '',
    Email: '',
    Address: '',
    Phone: '',
    Password:'',
    Premium: '',
    Offer:'',
    Status:'',
  }
  
  onEdit(userData: any) {
    debugger;
    this.profileFormModel.patchValue({
      id: userData.id,
      fullname: userData.fullname,
      email: userData.email,
      address: userData.address,
      phone: userData.phone,
      password: userData.password,
      premium: userData.premium,
      offer: userData.offer,
      status: userData.status,
    });
    this.updateEmp = { ...userData }
  }

  updateDetails() {
    this._api.updateData(this.updateEmp.id, this.profileFormModel.value).subscribe(res => {
      this._toastr.success("Updated successfully!!")
      let ref = document.getElementById('cancel');
      ref?.click();
      this.profileFormModel.reset();
      this.getDetails();
      window.location.reload(); // Refresh the page after update
    });

  }

  // ERROR MESSAGE IN CONTROLS (INPUT)
  get error() {
    return this.profileFormModel.controls;
  }

  //************************** MODAL FORM STARTS ***********************//
  open(content: any) {
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result.then();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  //************************** MODAL FORM ENDS ***********************//
}
