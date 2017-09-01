import { AlertController, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {

    loading;

    constructor(private loadingCtrl: LoadingController){}

    public presentLoading(){
        this.loading = this.loadingCtrl.create({
            // content: 'Please wait...'
        });
        this.loading.present();
    }

    public dismissLoading(){
        this.loading.dismiss();
    }
}