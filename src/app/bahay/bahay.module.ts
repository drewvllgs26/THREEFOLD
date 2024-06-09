import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BahayPageRoutingModule } from './bahay-routing.module';

import { BahayPage } from './bahay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BahayPageRoutingModule
  ],
  declarations: [BahayPage]
})
export class BahayPageModule {}
