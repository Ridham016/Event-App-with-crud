import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonDatetime, NavController } from '@ionic/angular';
import { DbService,Event } from '../services/db.service';

@Component({
  selector: 'app-event-reg',
  templateUrl: './event-reg.page.html',
  styleUrls: ['./event-reg.page.scss'],
})
export class EventRegPage implements OnInit {

  currentDate = new Date().toISOString();
  event:Event={
    Title: '',
    id: 0,
    DateNTime: '',
    Duration: 0,
    Description: '',
    Venue: '',
    TypeofEvent: ''
  }
  data:any;




  constructor(private formBuilder: FormBuilder,private db:DbService, private navController: NavController,private alertController: AlertController,private router: Router,private http: HttpClient)  {

  }

  sendData(title:string,date:string,dur:number,desc:string,tof1:string,venu1:string ) {
    this.db.addEvent(title,date,dur,desc,tof1,venu1).then(_=>{
      this.showAlert1();
    })
    .catch(error=>{
      this.showAlert();
    })
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
      message: 'EVENT ADDED',
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
