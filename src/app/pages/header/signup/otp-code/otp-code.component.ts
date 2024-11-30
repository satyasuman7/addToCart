import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import "firebase/auth";
import "firebase/firestore";
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-code',
  templateUrl: './otp-code.component.html',
  styleUrls: ['./otp-code.component.scss']
})
export class OtpCodeComponent {
  otp!:string;
  verify:any;
  constructor(private _router:Router){}

  ngOnInit(){
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    console.log(this.verify);
  }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px'
    }
  }

  onOtpChange(otpCode:any){
    this.otp = otpCode;
    console.log(this.otp);
  }

  handleCheck(){
    var credentials = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );

    firebase.auth().signInWithCredential(credentials)
      .then((res) =>{
        console.log(res);
        localStorage.setItem('user_data', JSON.stringify(res));
        this._router.navigate(['signup']);
      })
      .catch((error) => {
        alert(error.message);
      })
  }
}
