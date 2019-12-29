import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakeQuizPageRoutingModule } from './take-quiz-routing.module';

import { TakeQuizPage } from './take-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakeQuizPageRoutingModule
  ],
  declarations: [TakeQuizPage]
})
export class TakeQuizPageModule {}
