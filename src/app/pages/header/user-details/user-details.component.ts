import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { variableModel } from 'src/app/model/variables.model';
import { ApiService } from 'src/app/services/Api/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  signupFormModel!: FormGroup;
  userObj:variableModel = new variableModel;
  userData: any;

  constructor(private _api:ApiService, private _modalService: NgbModal, private _toastr:ToastrService){
    this.signupFormModel = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.userObj.numberRegEx), Validators.maxLength(10), Validators.minLength(10)]),
      premium: new FormControl('', [Validators.required]),
      offer: new FormControl([], [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      isactive: new FormControl(false)
    })
  }
  
  ngOnInit(): void {
    this.getDetails();
  }

  // GET DETAILS OF USERS
  getDetails() {
    this._api.getData().subscribe((res)=>{
      this.userData = res;
    })
  }

  // DELETE DETAILS OF USERS //
  deleteDetails(data: any) {
    this._api.deleteData(data.id).subscribe(res => {
      this._toastr.error("Employee Deleted !");
      this.getDetails();
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
    isactive:'',
  }
  
  onEdit(data: any) {
    this.signupFormModel.patchValue({
      fullname: data.fullname,
      email: data.email,
      address: data.address,
      phone: data.phone,
      password: data.password,
      premium: data.premium,
      offer: data.offer,
      isactive: data.isactive,
    });
    this.updateEmp = { ...data }
  }

  updateDetails() {
    if(this.signupFormModel.valid){
      this._api.updateData(this.updateEmp.id, this.signupFormModel.value).subscribe(res => {
        this._toastr.success("Updated Successfully");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.signupFormModel.reset();
        this.getDetails();
      });
    }
    else{
      this._toastr.warning('Please select option');
    }
  }

  // ERROR MESSAGE IN CONTROLS (INPUT)
  get error() {
    return this.signupFormModel.controls;
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
