import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassedPage } from './passed.page';

const routes: Routes = [
  {
    path: '',
    component: PassedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassedPageRoutingModule {}
