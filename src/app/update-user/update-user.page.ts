import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ɵpatchComponentDefWithScope } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from '../services/db.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  gg1: any;
  id:any;
  data:any;

  constructor(private formBuilder: FormBuilder,private db :DbService,private router: Router,private http: HttpClient,private activatedRoute: ActivatedRoute, private alertController: AlertController) {
    this.gg1 = this.formBuilder.group({
      password: ['', Validators.required],
      fname: ['', Validators.required],
      event: ['', Validators.required]
    });

    this.id=this.activatedRoute.snapshot.queryParams['id'];
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


  onSubmit1() {
      const f=this.gg1.get('fname').value;
      const p=this.gg1.get('password').value;
      const e=this.gg1.get('event').value;
      const i=this.id;
      this.sendData(f,p,e,i);

  }
}
