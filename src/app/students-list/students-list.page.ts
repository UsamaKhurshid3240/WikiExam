import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../dbservices.service';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.page.html',
  styleUrls: ['./students-list.page.scss'],
})
export class StudentsListPage implements OnInit {
  stu = [];
  s = [];
  arr = [];

  constructor(private httpClient: HttpClient, public dbservice: DbservicesService) { }
  loading = false;
  quotes = [{ "students": { "student": { name: "usama", id: "23" } } }];

  ngOnInit() {
    this.get();


  }

  sDisplay = [];


  get() {
    this.loading = true;
    console.log('get');
    this.dbservice.getAllStudents().subscribe(
      data => {
        this.loading = false;
        var keys = Object.keys(data.students);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          const h = {
            username: data.students[k].username,
            email: data.students[k].email,
            password: data.students[k].password,
            dob: data.students[k].dob,
            gender: data.students[k].gender,
            Mobile: data.students[k].mobilenumber,
            Role: data.students[k].role,
            Reg: data.students[k].reg,
            Age: data.students[k].age
          }
          this.s.push(h);
          console.log("Final" + h);
        }


        this.sDisplay = JSON.parse(JSON.stringify(this.s));
        console.log("s" + this.s);
        console.log("sDisplay" + this.sDisplay);




      },
      error => {
        this.loading = false;
        console.log('error', error);
      }
    );
  }


  filterTechnologies(param: any): void {

    let val: string = param;
    // DON'T filter the technologies IF the supplied input is an empty string
    if (val.trim() !== '') {
      this.sDisplay = this.s.filter((item) => {
        return item.username.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.email.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
    else {

      this.sDisplay = JSON.parse(JSON.stringify(this.s));
    }


  }


  onKeypress(param: any) {
    console.log("jsd");




  }
  signout() {
    this.dbservice.logout();

  }

  delete(reg, role) {
    this.dbservice.delete(reg, role);
    console.log(role + reg);

  }




}
