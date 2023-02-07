import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonDatetime, NavController } from '@ionic/angular';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-event-reg',
  templateUrl: './event-reg.page.html',
  styleUrls: ['./event-reg.page.scss'],
})
export class EventRegPage implements OnInit {
  gg: FormGroup |any;
  currentDate = new Date().toISOString();

  data:any;




  constructor(private formBuilder: FormBuilder,private db:DbService, private navController: NavController,private alertController: AlertController,private router: Router,private http: HttpClient)  {
    this.gg = this.formBuilder.group({
      title: ['', Validators.required],
      dnt: ['', Validators.required],
      dur: ['', Validators.required],
      desc: ['', Validators.required],
      tof: ['', Validators.required],
      Venue: ['', Validators.required]
    });


  }

  sendData(title:string,date:string,dur:number,desc:string,tof1:string,venu1:string ) {
    const g={title:""+title,dnt:''+date,dur:''+dur,desc:''+desc,tof:""+tof1,venue:""+venu1}
    this.db.addEvent(title,date,dur,desc,tof1,venu1).then(_=>{
      this.showAlert1();
    })
    .catch(error=>{
      this.showAlert();
    })
  }
  ngOnInit(): void {

  }
  onSubmit() {
    if (this.gg.valid) {
      const f=this.gg.get('title').value;
      const em=this.gg.get('dnt').value;
      const p=this.gg.get('dur').value;
      const e=this.gg.get('desc').value;
      const t=this.gg.get('tof').value;
      const v=this.gg.get('Venue').value;
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
