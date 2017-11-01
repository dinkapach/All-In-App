import { AlertController, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

// this service is for loading service 
// every time we loading somthing in our app, present the 'thinking ciecle'
// to know when the app is loading

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