import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService,Event } from '../services/db.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
  fav_event:Event['TypeofEvent'];
  listData:Event[]=[];
  selectedEvent=0;

  constructor(private router: Router,private db:DbService,private http: HttpClient,private activatedRoute: ActivatedRoute) {


    this.fav_event=this.activatedRoute.snapshot.queryParams['intE'];
    console.log(this.fav_event);
    this.sendData();

  }

  ngOnInit() {

  }

  sendData() {

 this.db.dbState().subscribe(rdy => {
  if (rdy) {
    this.db.userFavEvent(this.fav_event).then(_=>{
      this.db.fetchUserFavEvents().subscribe((devs) => {
        this.listData= devs;
        console.log(this.listData);
      })
    }).catch(error=>console.error);

  }
});
  }

   Logout(){
    this.router.navigate(['/home']);
    localStorage.removeItem('username');
    localStorage.removeItem('password');
   }

}
