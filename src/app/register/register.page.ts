import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  verificationId: any;
  code = '';
  phone: number;
 
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder
  ) {}
 
  ngOnInit(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
 
  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created. Please log in.";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }
  send() {
    const tell = '+91' + this.phone;
    (<any> window).FirebasePlugin.verifyPhoneNumber(tell, 60, (credential) => {
      console.log(credential);
      this.verificationId = credential.verificationId;
    }, (error) => {
      console.error(error);
      alert(error);
     });
  }

  verify() {
    const signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.code);
    firebase.auth().signInWithCredential(signInCredential).then((info) => {
      console.log(info);
      // this.navCtrl.navigateRoot('/home'); 
    }, (error) => {
      console.log(error);
    });
    }

 
  goLoginPage(){
    this.navCtrl.navigateBack('');
  }
 
 
}