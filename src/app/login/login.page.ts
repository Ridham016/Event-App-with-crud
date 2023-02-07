import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService, Uesr } from '../services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  listData:Uesr[]=[];
log: FormGroup | any;
Status:any;
  data: any;
  id: any;
  rememberMe = false;

onSubmit() {

  const em=this.log.get('email').value;
  const p=this.log.get('password').value;
  this.getData(em,p);

  if (this.rememberMe) {
    localStorage.setItem('username', em);
    localStorage.setItem('password', p);
}

}

  constructor(private formBuilder: FormBuilder,private db:DbService,private router: Router,private http: HttpClient,private alertController: AlertController) {
    this.log = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }
  getData(email1:string,password1:string) {

      if(this.log.get('email').value=='admin@mail.com' && this.log.get('password').value=='admin12345'){
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
      this.log.get('email').setValue(storedUsername);
      this.log.get('password').setValue( storedPassword);
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
