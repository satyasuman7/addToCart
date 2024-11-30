import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/Api/api.service'; //CRUD api
import { variableModel } from 'src/app/model/variables.model';  //declare variable
import { CustomValidators } from 'src/app/model/matchPassword'; //match password logic
import { ImageUploadService } from 'src/app/services/ImageUpload/image-upload.service';

//Firebase Autherization
import firebase from 'firebase/compat/app';
import "firebase/auth";
import "firebase/firestore";

var config ={
  apiKey: "AIzaSyDroBbQY56_kWD9iy5qr7nnpiR5SzldPtQ",
  authDomain: "phone-auth-86a65.firebaseapp.com",
  projectId: "phone-auth-86a65",
  storageBucket: "phone-auth-86a65.appspot.com",
  messagingSenderId: "905399000720",
  appId: "1:905399000720:web:9398db56f831fa12314215"
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm:FormGroup;
  userObj:variableModel = new variableModel;
  reCaptchaVerifier:any;

  ngOnInit(){
    // firebase.initializeApp(config);
  }
  
  constructor(private _api:ApiService, private _router:Router, private _toastr:ToastrService, private _uploadImg:ImageUploadService) {
    this.signupForm = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.userObj.numberRegEx), Validators.maxLength(10), Validators.minLength(10)]),
      premium: new FormControl('', [Validators.required]),
      offer:  new FormControl('', [Validators.required]),
      // address: new FormGroup({
      //   country: new FormControl('', [Validators.required]),
      //   state: new FormControl('', [Validators.required]),
      //   district: new FormControl('', [Validators.required]),
      // }),
      // image: new FormControl(''),
      address: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cnfrm_pass: new FormControl('', [Validators.required]),
      isactive: new FormControl(false)
    },[CustomValidators.MatchValidator('password', 'cnfrm_pass')])
  }

  get error() {
    return this.signupForm.controls;
  }

  // FUNCTION TO ADD DETAILS TO JSON-SERVER
  addDetails(){
    if(this.signupForm.valid){

      this._api.postData(this.signupForm.value).subscribe({
        next:() => {
          this._toastr.success('Account Created');
          this.signupForm.reset();
          this._router.navigate(['login']);
          console.log(this.signupForm.value.offer);
        }
      })
    }
    else{
      this._toastr.warning('Please enter Valid Data !!');
    }
  }

  //IMAGE UPLOAD
  selectedFile: File | null = null;
  uploadedImageUrl: string | null = null;
  imagePreview: string | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // // GET OTP 
  // getOTP(){
  //   debugger;
  //   console.log("Phone No. = ",this.userObj.Phone);
  //   firebase.auth().signInWithPhoneNumber(this.userObj.Phone, this.reCaptchaVerifier)
  //   .then((confirmationResult)=>{
  //     localStorage.setItem('verificationId',JSON.stringify(confirmationResult.verificationId));
  //   }).catch((error)=>{
  //     this._toastr.error(error.message);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 5000);
  //   })
  // }
}
