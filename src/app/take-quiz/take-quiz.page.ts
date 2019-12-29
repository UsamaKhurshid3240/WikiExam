import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbservicesService } from '../dbservices.service';
import { database } from 'firebase';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.page.html',
  styleUrls: ['./take-quiz.page.scss'],
})
export class TakeQuizPage implements OnInit {
  quiz = [];
  issubmit: boolean = true;
  quizIndex = 0;
  constructor(private httpClient: HttpClient, public dbservice: DbservicesService, public router: Router) { }
  loading = false;


  ngOnInit() {
    this.getQuiz();


  }



  vv = [];

  getQuiz() {
    this.loading = true;
    console.log('get');
    this.dbservice.getQuiz().subscribe(
      data => {
        this.loading = false;
        console.log("quiz:" + data.quizes)
        var keys = Object.keys(data.quizes);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          const h = {
            question: data.quizes[k].Question,
            option1: data.quizes[k].Option1,
            option2: data.quizes[k].Option2,
            option3: data.quizes[k].Option3,
            option4: data.quizes[k].Option4,
            correctOption: data.quizes[k].correctAnswer

          }

          const sc = {
            question: data.quizes[k].Question,
            correctOption: data.quizes[k].correctAnswer


          }
          this.quiz.push(h);
          this.vv.push(sc);
          console.log("Final" + h);
        }



        console.log("s" + this.quiz);





      },
      error => {
        this.loading = false;
        console.log('error', error);
      }
    );
  }

  nextt() {
    this.quizIndex++;
    console.log(this.quiz.length - 1);

    if (this.quizIndex === this.quiz.length - 1) {
      this.issubmit = false;
    }
  }

  ans = [];
  score = 0;

  next(param: any, question) {

    let val: string = param;


    const f = {
      question: question.toString(),
      ans: val
    }
    this.ans.push(f);
    console.log(this.ans);

  }


  Submit() {



    for (var h = 0; h < this.ans.length; h++) {
      console.log(this.ans[h]);
      if (this.ans[h].question === this.vv[h].question) {

        for (var d = 0; d < this.ans.length; d++) {
          if (this.vv[h].correctOption === this.ans[d].ans) {
            this.score += 10;
            console.log(this.score);
          }
          else {

            console.log(this.score);
          }
        }
      }

    }

    this.dbservice.store(this.score);
    console.log("usama");

  }



}
