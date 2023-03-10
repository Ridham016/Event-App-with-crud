import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService, Uesr } from '../services/db.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  gg1: any;
  data:any;
  user:Uesr={
    Fullname: '', Email: '', Password: '', TypeofEvent: '',
    id: 0
  };

  constructor(private db :DbService,private router: Router,private http: HttpClient,private activatedRoute: ActivatedRoute, private alertController: AlertController) {

    this.user.id=this.activatedRoute.snapshot.queryParams['id'];
  }
  sendData(fullname1:string,password1:string,event1:string,id:number) {
    this.db.updateUser(fullname1,password1,event1).then(_=>{
      this.showAlertS();
      this.router.navigate(['/admin-home'] ,{ skipLocationChange: true });
    })
    .catch(error=>{
      this.showAlertF();
    })

  }

  ngOnInit(){

  }
  async showAlertF() {
    const alert = await this.alertController.create({
      header: 'FAILED',
      message: 'User Not Updated ',
      buttons: ['OK']
    });
     await alert.present();
  }
  async showAlertS() {
    const alert = await this.alertController.create({
      header: 'UPDATED',
      message: 'User Updated',
      buttons: ['OK']
    });
     await alert.present();
  }


  onSubmit(form:NgForm) {
    if (form.valid) {
      this.sendData(this.user.Fullname,this.user.Password,this.user.TypeofEvent,this.user.id);
    }
  }
}
