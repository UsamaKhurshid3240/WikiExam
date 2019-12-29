import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateExamPageRoutingModule } from './create-exam-routing.module';

import { CreateExamPage } from './create-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateExamPageRoutingModule
  ],
  declarations: [CreateExamPage]
})
export class CreateExamPageModule {}
