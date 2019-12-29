import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../dbservices.service';
import * as JWT from 'jwt-decode';
@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  score: String;
  t: any;
  user: String;
  userreg: String;
  scre: String;

  constructor(public dbservice: DbservicesService) { }

  ngOnInit() {
    this.dbservice.getToken().then(
      data => {
        this.t = JWT(data);


        this.user = this.t.name;
        this.userreg = this.t.reg;
        console.log(this.t.reg)
      },
      error => {

        console.log('error', error);
      }
    );

    this.dbservice.getScore().then(
      data => {
        this.score = data;
        console.log(this.score);
        this.scre = this.score;

      },
      error => {

        console.log('error', error);
      }
    );


  }

}
