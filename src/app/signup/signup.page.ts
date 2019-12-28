import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Firebase } from '@ionic-native/firebase';
import "firebase/auth";
import { AlertController, NavController, NavParams, MenuController, ToastController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker';
import { DbservicesService } from '../dbservices.service';
import { async } from 'q';
import * as moment from 'moment';
import { LoginPage } from '../login/login.page';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  datePicker: any;
  dob: string;
  name: string;
  email: string;
  gender: string;
  role: string;
  password: string;
  confirmpassword: string;
  mobilenumber: String;
  quotes: any;
  reg: String;
  dateofbirth: String;
  userId: String;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public menuCtrl: MenuController, public router: Router, public dbservice: DbservicesService) { }

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



  register() {

    this.dateofbirth = this.dob.slice(0, 10);
    console.log(this.dateofbirth);
    var yr = parseInt(this.dob.slice(0, 4));
    let now = moment().format('DD/MM/YYYY HH:mm:ss');
    var cur = parseInt(now.slice(6, 10));
    var age = cur - yr;
    //  / age = this.currentdate - this.year;
    console.log(age);

    dob: this.dob;
    name: this.name;
    email: this.email;
    password: this.password;
    gender: this.gender;
    role: this.role;
    mobilenumber: this.mobilenumber;
    reg: this.reg;
    console.log("rr" + this.role);
    this.dbservice.signup(this.name, this.email, this.password, this.gender, this.role, this.mobilenumber, this.dateofbirth, this.reg, age);
  }

  checkreg() {
    reg: this.reg;
    console.log("usama");
    this.dbservice.dbdata(this.reg);
  }

  async confirmpass() {
    password: this.password;
    confirmpassword: this.confirmpassword;

    if (this.password !== this.confirmpassword) {


      let alertConfirm = this.alertCtrl.create({

        message: 'Password Doest Match Please Re-Enter',
        buttons: [


          {

            text: 'OK',
            handler: async () => {
              console.log('Yes clicked');



            }

          }

        ]
      });
      (await (alertConfirm)).present();

    }
  }


  async signIn() {


    this.dbservice.email();
    var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    const phoneNumberString = "************";
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
              handler: async data => {
                confirmationResult.confirm(data.confirmationCode)
                  .then(function (result) {
                    // User signed in successfully.
                    console.log(result.user.uid);
                    console.log(data.confirmationCode);
                    //Pop back to the previous page.
                    this.userId = result.user.uid;

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
