import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateExamPage } from './create-exam.page';

const routes: Routes = [
  {
    path: '',
    component: CreateExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateExamPageRoutingModule {}
