import { Component, OnInit } from '@angular/core';
import { Config } from 'protractor';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DbservicesService } from '../dbservices.service';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {


  private isUsername: boolean = true;
  private isEmail: boolean = true;
  private isPassword: boolean = true;
  private isReg: boolean = true;
  private isGender: boolean = true;
  private isAge: boolean = true;
  private isDob: boolean = true;
  private isRole: boolean = true;
  private isMobile: boolean = true;
  confirmpassword: String;
  password: String;
  dob: String;

  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {
    this.password = "####";
    this.confirmpassword = "####";
    this.dob = "2019/2/22";
  }



  username() {
    this.isUsername = false;

  }
  mobileNo() {
    this.isMobile = false;

  }


  email() {
    this.isEmail = false;

  }

  pass() {
    this.isPassword = false;

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

  gender() {
    this.isGender = false;

  }

  dobb() {
    this.isDob = false;

  }

  age() {
    var yr = parseInt(this.dob.slice(0, 4));
    let now = moment().format('DD/MM/YYYY HH:mm:ss');
    var cur = parseInt(now.slice(6, 10));
    var age = cur - yr;
    //  / age = this.currentdate - this.year;
    console.log(age);
    document.getElementById("age").setAttribute("value", age.toString());
  }

}
