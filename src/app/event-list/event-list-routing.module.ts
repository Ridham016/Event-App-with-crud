import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventListPage } from './event-list.page';

const routes: Routes = [
  {
    path: '',
    component: EventListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),IonicModule.forRoot()],
  exports: [RouterModule],
})
export class EventListPageRoutingModule {}
