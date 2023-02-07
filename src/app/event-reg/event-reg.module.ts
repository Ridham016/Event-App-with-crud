import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventRegPageRoutingModule } from './event-reg-routing.module';

import { EventRegPage } from './event-reg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EventRegPageRoutingModule
  ],
  declarations: [EventRegPage]
})
export class EventRegPageModule {}
