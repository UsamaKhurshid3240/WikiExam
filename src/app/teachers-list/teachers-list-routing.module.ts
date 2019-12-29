import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeachersListPage } from './teachers-list.page';

const routes: Routes = [
  {
    path: '',
    component: TeachersListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersListPageRoutingModule {}
