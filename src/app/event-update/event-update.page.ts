import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonDatetime, NavController } from '@ionic/angular';
import { DbService,Event } from '../services/db.service';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.page.html',
  styleUrls: ['./event-update.page.scss'],
})
export class EventUpdatePage implements OnInit {

  gg: FormGroup |any;
  currentDate = new Date().toISOString();
  id: any;
  event:Event={
    Title: '',
    id: 0,
    DateNTime: '',
    Duration: 0,
    Description: '',
    Venue: '',
    TypeofEvent: ''
  }


  constructor(private formBuilder: FormBuilder,private db:DbService, private navController: NavController,private activatedRoute: ActivatedRoute,private alertController: AlertController,private router: Router,private http: HttpClient)  {

    this.id=this.activatedRoute.snapshot.queryParams['id'];
  }

  sendData(title:string,Date:string,dur:number,desc:string,tof1:string,venu1:string ) {
    this.db.updateEvent(title,Date,dur,desc,tof1,venu1,this.id).then(_=>{
      this.showAlert1();
    }).catch(error=>{
      this.showAlert();
    });
  }
  ngOnInit(): void {

  }
  onSubmit(form:NgForm) {
    if (form.valid) {
      const f=this.event.Title;
      const em=this.event.DateNTime;
      const p=this.event.Duration;
      const e=this.event.Description;
      const t=this.event.TypeofEvent;
      const v=this.event.Venue;
      this.sendData(f,em,p,e,t,v);
    }
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'NOt DONE',
      message: 'EVENT not ADDED',
      buttons:  [
        {
          text: 'OK',
          handler: () => {
            this.navController.navigateForward('/admin-home');
          }
        }
      ]
    });
     await alert.present();
  }
  async showAlert1() {
    const alert = await this.alertController.create({
      header: ' DONE',
      message: 'EVENT  ADDED',
      buttons:  [
        {
          text: 'OK',
          handler: () => {
            this.navController.navigateForward('/event-list');
          }
        }
      ]
    });
     await alert.present();
  }
}
