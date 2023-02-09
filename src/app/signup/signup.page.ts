import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService,Uesr } from '../services/db.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
 user:Uesr={
   Fullname: '', Email: '', Password: '', TypeofEvent: '',
   id: 0
 };
  data: any;

constructor(private db:DbService,private router: Router,private alertController: AlertController,private http: HttpClient)  {

}
sendData(fullname1:string,email1:string,password1:string,event1:string) {

  this.db.addUser(fullname1,email1,password1,event1).then(_=>{
    this.showAlertT();
    this.router.navigate(['/login']);
  }).catch(error=>{
    this.showAlertF();
  });
}
ngOnInit() {

}


onSubmit(form:NgForm ) {
    this.sendData(this.user.Fullname,this.user.Email,this.user.Password,this.user.TypeofEvent);

}
  async showAlertF() {
    const alert = await this.alertController.create({
      header: 'INVAILD',
      message: 'EMAIL ALready exist',
      buttons: ['OK']
    });
     await alert.present();
  }

  async showAlertT() {
    const alert = await this.alertController.create({
      header: 'USER REGISTERED',
      message: 'Now Can LogIn',
      buttons: ['OK']
    });
     await alert.present();
  }
}


