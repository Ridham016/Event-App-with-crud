import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService, Event, Uesr } from '../services/db.service';



@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {
  listData: Event[]=[];
  id: any;

  constructor(private http: HttpClient,private router:Router,private db:DbService) {
    this.getData();}

  ngOnInit() {
  }
  getData(){
    this.db.dbState().subscribe(rdy => {
      if (rdy) {
        this.db.fetchEvents().subscribe((devs) => {
          console.log('fetched');
          this.listData= devs;
          console.log(this.listData);
        })
      }
    });
  }

  updateEvent(id :number){
    this.navigate(id);

  }
  navigate(id:number){
    this.router.navigate(['/event-update'], {
      queryParams: {
        id:id
      }
    });
  }


  isDisabled(eDAte:string){
    const now = new Date().toISOString();
    if (now < eDAte) {
      return false;
    }
    return true;
  }
  }

