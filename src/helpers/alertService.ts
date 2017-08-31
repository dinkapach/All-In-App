import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class AlertService {

    constructor(private alertCtrl: AlertController) {
        
    }

    // presentAlert(subTitleToPresent){
    //     let alert = this.alertCtrl.create({
    //         subTitle: 'subTitleToPresent',
    //         buttons: ['סבבה']
    //     });
    //     alert.present();
    //     alert.onDidDismiss(() => {
    //         this.navCtrl.pop();
    //     });
    // }
}