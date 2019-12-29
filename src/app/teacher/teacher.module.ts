import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherPageRoutingModule } from './teacher-routing.module';

import { TeacherPage } from './teacher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherPageRoutingModule
  ],
  declarations: [TeacherPage]
})
export class TeacherPageModule {}
