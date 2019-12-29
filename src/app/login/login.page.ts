import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import * as firebase from 'firebase';
import { Firebase } from '@ionic-native/firebase';
import "firebase/auth";
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Content } from '@angular/compiler/src/render3/r3_ast';

import { DbservicesService } from '../dbservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  role: String;

  constructor(public menuCtrl: MenuController, public dbservice: DbservicesService) {

  }

  ngOnInit() {


  }





  ionViewWillEnter() {
    this.menuCtrl.enable(false);

  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }


  fb() {
    // this.apiservice.fblogin("uk");
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(res => {
      console.log(res.user.email);
    })



  }




  ggl() {
    // this.apiservice.fblogin("uk");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(res => {
      console.log(res.user.email);
    })





  }


  signIn() {


    role: this.role;
    email: this.email;
    password: this.password;
    console.log(this.role);
    this.dbservice.localstorage(this.role);
    this.dbservice.login(this.email, this.password, this.role);




  }



}
