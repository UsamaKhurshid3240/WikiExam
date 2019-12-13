import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Firebase } from '@ionic-native/firebase';
import "firebase/auth";
import { AlertController, NavController, NavParams, MenuController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  datePicker: any;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public menuCtrl: MenuController,public router:Router) { }

  ngOnInit() {
  
  }

  
   
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

 

  signIn() {

   


    var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    const phoneNumberString = "+923475052262";
    //Signin with phonenumbers requires BOTH the phone number and a verified captcha
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(async confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        console.log("Usama"+confirmationResult);
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
                    this.router.navigate("/login");
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
