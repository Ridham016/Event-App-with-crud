import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import {Router } from '@angular/router';
import { NavController,IonRefresher, AlertController  } from '@ionic/angular';
import { DbService,Uesr,Event} from '../services/db.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

 listData:Uesr[]=[];



  constructor(private http: HttpClient, private navController: NavController,private alertCtrl: AlertController,private router:Router,private db:DbService) {

  }

  ngOnInit() {
    this.db.dbState().subscribe(rdy => {
      if (rdy) {
        this.db.fetchUsers().subscribe((devs) => {
          console.log('fetched');
          this.listData= devs;
          console.log(this.listData);
        })
      }
    });
  }


navigate(id:number){
  this.router.navigate(['/update-user'], {
    queryParams: {
      id:id
    }
  });
}
updateTask(id: number){
console.log(id);
this.navigate(id);

}

deleteTask(id: number){
  console.log(id);
 this.db.deleteUser(id);
}


Logout(){
  this.router.navigate(['/home']);
  localStorage.removeItem('username');
  localStorage.removeItem('password');
 }



 async presentDeleteConfirm(id:any) {
  const alert = await this.alertCtrl.create({
    header: 'Confirm',
    message: 'Are you sure you want to delete this item?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Delete',
        handler: () => {
          console.log('Confirm Okay');
          this.deleteTask(id);
        }
      }
    ]
  });

  await alert.present();
}
}
