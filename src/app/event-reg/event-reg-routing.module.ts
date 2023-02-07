import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventRegPage } from './event-reg.page';

const routes: Routes = [
  {
    path: '',
    component: EventRegPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRegPageRoutingModule {}
