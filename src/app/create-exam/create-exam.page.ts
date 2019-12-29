import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../dbservices.service';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.page.html',
  styleUrls: ['./create-exam.page.scss'],
})
export class CreateExamPage implements OnInit {
  question: String;
  optionA: String;
  optionB: String;
  optionC: String;
  optionD: String;
  correctAnswer: String;
  constructor(public dbservice: DbservicesService) { }

  ngOnInit() {
  }

  addQuiz() {
    question: this.question;
    option1: this.optionA;
    option2: this.optionB;
    option3: this.optionC;
    option4: this.optionD;
    correctOption: this.correctAnswer;

    this.dbservice.saveQuiz(this.question, this.optionA, this.optionB, this.optionC, this.optionD, this.correctAnswer);
  }


}
