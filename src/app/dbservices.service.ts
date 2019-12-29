import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AppComponent } from './app.component';
import { Observable } from 'rxjs';

import * as JWT from 'jwt-decode';
import { AlertController, Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbservicesService {
  tk: any;
  role: any;
  stu = [];
  t: any;
  constructor(public event: Events, public app: AppComponent, private httpClient: HttpClient, public router: Router, public storage: Storage, public alertCtrl: AlertController) { }


  signup(nm, em, pass, gender, rol, mbnumber, dob, rg, ag) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = {
      name: nm,
      email: em,
      password: pass,
      gender: gender,
      role: rol,
      mbnumber: mbnumber,
      dob: dob,
      reg: rg,
      age: ag
    }



    console.log("POST" + body);
    return this.httpClient.post("http://localhost:3000/signup", body, { headers: headers })

      .subscribe(data => {
        console.log(data);

      });
  }


  update(nm, em, pass, reg, role, gender, dob, agge, mb) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = {
      name: nm,
      email: em,
      password: pass,
      gender: gender,
      role: role,
      mbnumber: mb,
      dob: dob,
      reg: reg,
      age: agge
    }



    console.log("Update" + body);
    return this.httpClient.post("http://localhost:3000/update", body, { headers: headers })

      .subscribe(data => {
        console.log(data);
      });
  }

  saveQuiz(ques, op1, op2, op3, op4, correctOp) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = {
      question: ques,
      option1: op1,
      option2: op2,
      option3: op3,
      option4: op4,
      correctAnswer: correctOp

    }



    console.log("POST" + op1);
    return this.httpClient.post("http://localhost:3000/addquiz", body, { headers: headers })

      .subscribe(data => {
        console.log(data);
      });


  }

  delete(reg, role) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = {
      role: role,
      reg: reg
    }



    console.log("Delete" + body);
    return this.httpClient.post("http://localhost:3000/delete", body, { headers: headers })

      .subscribe(data => {
        console.log(data);
      });
  }

  async getToken() {
    this.tk = await
      this.storage.get("Token");
    this.t = JWT(this.tk);


    return this.tk;
  }

  async f() {

    this.tk = await
      this.storage.get("Token");
    this.t = JWT(this.tk);

    console.log("role" + this.t.role);
    if (this.t !== null) {
      //this.role = await
      // this.storage.get('role');

      if (this.t.role === "Admin") {
        this.router.navigateByUrl('admin');

      } else if (this.t.role === "Teacher") {
        this.router.navigateByUrl('teacher');
      }
      else if (this.t.role === "Student") {
        this.router.navigateByUrl('student');
      }
    }
  }
  dbdata(reg) {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = {
      reg: reg
    }



    console.log("POST");
    return this.httpClient.post("http://localhost:3000/st", body, { headers: headers }).pipe()

      .subscribe(data => {
        console.log(data);



      });


  }



  login(email, password, role) {


    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = {
      email: email,
      password: password,
      role: role
    }



    console.log("POST" + email + "  " + password + "   " + role);
    return this.httpClient.post("http://localhost:3000/st", body, { headers: headers }).pipe()

      .subscribe(data => {
        console.log(data);

        this.storage.set("Token", data.token).then(result => {
          console.log('Data is saved');
         this.f();
        }).catch(e => {
          console.log("error: " + e);
        })


      });





  }

  localstorage(role) {
    this.storage.set('role', role).then(result => {
      console.log('Data is saved');
    }).catch(e => {
      console.log("error: " + e);
    })
  }

  logout() {
    this.storage.remove("Token");
    this.router.navigateByUrl('login');

  }

  getAllStudents(): Observable<any> {

    const url = "http://localhost:3000/students";

    return this.httpClient.get(url);


  }

  getAllTeachers(): Observable<any> {

    const url = "http://localhost:3000/teachers";

    return this.httpClient.get(url);


  }

  getQuiz(): Observable<any> {

    const url = "http://localhost:3000/quizes";

    return this.httpClient.get(url);


  }
  score;
  async getScore() {
    this.score = await
      this.storage.get("Score");
    return this.score;

  }

  store(score) {
    let sc = score;
    console.log("DbScore" + score);
    this.storage.set("Score", sc);

    this.router.navigateByUrl("result");
  }

  email() {

    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = {
      email: "hamza.bsse3349@iiu.edu.pk",

    }




    return this.httpClient.post("http://localhost:3000/send-email", body, { headers: headers }).pipe()

      .subscribe(async data => {
        console.log(data);

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
                data.code.confirm(data.confirmationCode)
                  .then(function (result) {
                    // User signed in successfully.
                    console.log(result);
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





  }

}
