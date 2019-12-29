import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import * as JWT from 'jwt-decode';
import { DbservicesService } from '../dbservices.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
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
  mb: String;
  genderr: String;
  agge: String;
  name: String;
  emaill: String;
  reg: String;
  role: String;
  tk: any;
  t: any;

  constructor(public alertCtrl: AlertController, public dbservice: DbservicesService) { }

  ngOnInit() {
    this.dbservice.getToken().then(
      data => {
        this.t = JWT(data);

        console.log(this.t);
        this.password = this.t.password;
        this.confirmpassword = this.t.password;
        this.dob = this.t.dob;
        this.mb = this.t.mobilenumber;
        this.agge = this.t.age;
        this.role = this.t.role;
        this.reg = this.t.reg;
        this.name = this.t.name;
        this.emaill = this.t.username;
        this.genderr = this.t.gender;

      },
      error => {

        console.log('error', error);
      }
    );



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

  ag: any;
  age() {
    var yr = parseInt(this.dob.slice(0, 4));
    let now = moment().format('DD/MM/YYYY HH:mm:ss');
    var cur = parseInt(now.slice(6, 10));
    this.ag = cur - yr;
    //  / age = this.currentdate - this.year;
    console.log(this.ag);
    document.getElementById("age").setAttribute("value", this.ag.toString());
  }


  update() {
    mobile: this.mb;
    name: this.name;
    email: this.emaill;
    gender: this.genderr;
    dob: this.dob;
    age: this.agge;
    role: this.role;
    reg: this.reg;
    password: this.password;

    console.log("mb" + this.mb);
    console.log("mb" + this.name);
    console.log("mb" + this.password);
    console.log("mb" + this.agge);
    console.log("mb" + this.reg);
    console.log("mb" + this.dob);

    this.dbservice.update(this.name, this.emaill, this.password, this.reg, this.role, this.genderr, this.dob, this.agge, this.mb);
  }

}
