import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../dbservices.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.page.html',
  styleUrls: ['./teachers-list.page.scss'],
})
export class TeachersListPage implements OnInit {
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
    this.dbservice.getAllTeachers().subscribe(
      data => {
        this.loading = false;
        var keys = Object.keys(data.teachers);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          const h = {
            username: data.teachers[k].username,
            email: data.teachers[k].email,
            password: data.teachers[k].password,
            dob: data.teachers[k].dob,
            gender: data.teachers[k].gender,
            Mobile: data.teachers[k].mobilenumber,
            Role: data.teachers[k].role,
            Reg: data.teachers[k].reg,
            Age: data.teachers[k].age
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
