import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

export interface Event {
  Title: string;
  id:number;
  DateNTime: string;
  Duration:number;
  Description:string;
  Venue:string;
  TypeofEvent:string;
}
export interface Uesr {
  id:number;
  Fullname: string;
  Email: string;
  Password:string;
  TypeofEvent:string;

}

@Injectable({
  providedIn: 'root'
})
export class DbService {

 private _storage!: SQLiteObject;

  eventList = new BehaviorSubject<Event[]>([]);
  eventFavList = new BehaviorSubject<Event[]>([]);
  userList = new BehaviorSubject<Uesr[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter :SQLitePorter,
  )
  {

    this.dbCreate();
  }

 dbCreate(){

    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'event_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this._storage = db;
          this.getFakeData();

      });
    });
  }
  getFakeData() {
    this.httpClient.get(
      'assets/dump.sql',
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this._storage, data)
        .then(async(_) => {
          this.getEvents();
          this.getUsers();
          this.isDbReady.next(true);
        })
        .catch(error=> console.error(error));
    });
  }
  async getUsers() {
    const res = await this._storage.executeSql('SELECT * FROM userDetails', []);
    let items: Uesr[]= [];
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          id:res.rows.item(i).id,
          Fullname: res.rows.item(i).Fullname,
          Email: res.rows.item(i).Email,
          Password: res.rows.item(i).Password,
          TypeofEvent: res.rows.item(i).TypeofEvent
        });
      }

    }
    this.userList.next(items);
  }


  dbState() {
    return this.isDbReady.asObservable();
  }
  async doLogin(email:Uesr['Email'],pass:Uesr['Password']){
    let data=[email,pass];
    const res = await this._storage.executeSql('SELECT * FROM userDetails WHERE Email=? AND Password=?',data );
    if(res.rows.length>0){
      return res.rows.item(0).TypeofEvent
    }
    else{
      return false
    }
  }
  async userFavEvent(eve:Event['TypeofEvent']){
    let data=[eve];
    console.log(data);
    const res = await this._storage.executeSql('SELECT * FROM eventDetails WHERE TypeofEvent=?',data);
    console.log(res);

    let items: Event[] =[];
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          Title: res.rows.item(i).Title,
          id: res.rows.item(i).id,
          Duration: res.rows.item(i).Duration,
          Description: res.rows.item(i).Description,
          Venue: res.rows.item(i).Venue,
          TypeofEvent: res.rows.item(i).TypeofEvent,
          DateNTime: res.rows.item(i).DateNTime,
        });
      }
  }
  this.eventFavList.next(items);
}
  fetchEvents(): Observable<Event[]> {
    return this.eventList.asObservable();
  }
  fetchUserFavEvents(): Observable<Event[]> {
    return this.eventFavList.asObservable();
  }
  fetchUsers(): Observable<Uesr[]> {
    return this.userList.asObservable();
  }
  async getEvents(){
    const res = await this._storage.executeSql('SELECT * FROM eventDetails', []);
    let items: Event[] =[];
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          Title: res.rows.item(i).Title,
          id: res.rows.item(i).id,
          Duration: res.rows.item(i).Duration,
          Description: res.rows.item(i).Description,
          Venue: res.rows.item(i).Venue,
          TypeofEvent: res.rows.item(i).TypeofEvent,
          DateNTime: res.rows.item(i).DateNTime,
        });
      }

    }
    this.eventList.next(items);
}
  async addEvent(title:Event['Title'],dnt:Event['DateNTime'],dur:Event['Duration'],des:Event['Description'],tof:Event['TypeofEvent'],ven:Event['Venue']) {
  let data = [title,dnt,dur,des,tof,ven];
  const res = await this._storage.executeSql('INSERT INTO eventDetails(Title,DateNTime,Duration,Description,TypeofEvent,Venue) VALUES (?, ?,?,?, ?,?)', data);
  this.getEvents();
}

async updateEvent(title:Event['Title'],dnt:Event['DateNTime'],dur:Event['Duration'],des:Event['Description'],tof:Event['TypeofEvent'],ven:Event['Venue'],id:Event['id']) {
  let data = [title,dnt,dur,des,tof,ven,id];
  const res = await this._storage.executeSql('UPDATE eventDetails SET  Title=?,DateNTime=?,Duration=?,Description=?,TypeofEvent=?,Venue=? WHERE id=?', data);
  this.getEvents();
}

async updateUser(name:Uesr['Fullname'],pass:Uesr['Password'],tof:Uesr['TypeofEvent']) {
  let data = [name,pass,tof];
  const res = await this._storage.executeSql('UPDATE userDetails SET Fullname=?,Password=?,TypeofEvent=?', data);
  this.getUsers();
}

  async getEvent(T :string):Promise<Event>{
  const res = await this._storage.executeSql('SELECT * FROM eventDetails WHERE typeofevent=?', [T]);
  return {
    Title: res.rows.item(0).Title,
    id: res.rows.item(0).id,
    Duration: res.rows.item(0).Duration,
    Description: res.rows.item(0).Description,
    Venue: res.rows.item(0).Venue,
    TypeofEvent: res.rows.item(0).TypeofEvent,
    DateNTime: res.rows.item(0).DateNTime,
  };
}
deleteUser(id:Uesr['id']) {
  return this._storage.executeSql('DELETE FROM userDetails WHERE id = ?', [id]).then(_ => {
    this.getUsers();
    this.getEvents();
  });
}

addUser(name:Uesr['Fullname'],email:Uesr['Email'],pass:Uesr['Password'],tof:Uesr['TypeofEvent']) {
  let data = [name,email,pass,tof];
  return this._storage.executeSql('INSERT INTO userDetails (Fullname,Email,Password,TypeofEvent) VALUES (?, ?, ?,?)', data).then(data => {
    this.getUsers();
  });
}



}
