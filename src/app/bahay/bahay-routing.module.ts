import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BahayPage } from './bahay.page';

const routes: Routes = [
  {
    path: '',
    component: BahayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BahayPageRoutingModule {}
