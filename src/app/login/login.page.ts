import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService, Uesr } from '../services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user:Uesr={
    Fullname: '', Email: '', Password: '', TypeofEvent: '',
    id: 0
  };
  listData:Uesr[]=[];
Status:any;
  data: any;
  id: any;
  rememberMe = false;

onSubmit(form:NgForm) {

  const em=this.user.Email;
  const p=this.user.Password;
  this.getData(em,p);

  if (this.rememberMe) {
    localStorage.setItem('username', em);
    localStorage.setItem('password', p);
}

}

  constructor(private db:DbService,private router: Router,private http: HttpClient,private alertController: AlertController) {

  }
  getData(email1:string,password1:string) {

      if(this.user.Email=='admin@mail.com' && this.user.Password=='admin12345'){
        this.router.navigate(['/admin-home']);
       }
       else {
        this.db.doLogin(email1,password1).then(res=>{
          if(res){
            this.navigate(res);
          }
          else{
            this.showAlertF();
          }
      })
     }

  }


  navigate(tof:string){
    this.router.navigate(['/user-home'], {
      queryParams: {
        intE:tof
      }
    });
  }
  ngOnInit() {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      this.user.Email=storedUsername;
      this.user.Password= storedPassword;
      this.rememberMe = true;
    }

  }


  async showAlertF() {
    const alert = await this.alertController.create({
      header: 'INVAILD',
      message: 'EMAIL or Password is wrong',
      buttons: ['OK']
    });
     await alert.present();
  }


}
