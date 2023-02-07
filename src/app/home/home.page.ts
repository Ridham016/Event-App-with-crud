import { Component } from '@angular/core';
import { AlertController,Platform } from '@ionic/angular';
import { Location } from '@angular/common';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private platform: Platform,private alertCtrl: AlertController, private location: Location) {}

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.onBackButtonPress();
    });
  }
  async onBackButtonPress() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Exit',
      message: 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

}
