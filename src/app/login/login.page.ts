import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import * as firebase from 'firebase';
import { Firebase } from '@ionic-native/firebase';
import "firebase/auth";
import { AlertController, NavController, NavParams } from '@ionic/angular';

import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  toastCtrl: any;
  userEmail: string;
  userName: string;
  facebook: any;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public menuCtrl: MenuController) {

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






    // var phoneNumber = "+923475052262";
    // var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    // firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    //   .then(function (confirmationResult) {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     this.confirmationResult = confirmationResult;
    //   }).catch(function (error) {
    //     // Error; SMS not sent
    //     // ...
    //   });
  }

  signIn() {

    // this.apiservice.fblogin();


    var phoneNumber = "+923315214148";
    var testVerificationCode = "12345";

    // This will render a fake reCAPTCHA as appVerificationDisabledForTesting is true.
    // This will resolve after rendering without app verification.
    var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    // signInWithPhoneNumber will call appVerifier.verify() which will resolve with a fake
    // reCAPTCHA response.
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // confirmationResult can resolve with the whitelisted testVerificationCode above.
        return confirmationResult.confirm(testVerificationCode)
      }).catch(function (error) {
        // Error; SMS not sent
        // ...
      });


    var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    const phoneNumberString = "+923315214148";
    //Signin with phonenumbers requires BOTH the phone number and a verified captcha
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(async confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        let prompt = this.alertCtrl.create({

          inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
          buttons: [
            {
              text: 'Cancel',
              handler: data => { console.log('Cancel clicked'); }
            },
            {
              text: 'Send',
              handler: data => {
                confirmationResult.confirm(data.confirmationCode)
                  .then(function (result) {
                    // User signed in successfully.
                    console.log(result.user);
                    console.log(data.confirmationCode);
                    //Pop back to the previous page.
                    this.navCtrl.pop();

                  }).catch(function (error) {
                    // User couldn't sign in (bad verification code?)
                    // ...
                  });
              }
            }
          ]
        });
        (await prompt).present();
      })
      .catch(function (error) {
        console.error("SMS not sent", error);
      });

  }



}
