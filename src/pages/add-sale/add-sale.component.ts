import { CameraService } from './../../helpers/camera-service';
import { ManagerService } from './../../services/manager.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {CreditsCardComponent} from  '../credits-card/credits.card.component';
import {UserCardComponent} from  '../user-card/usercard.component';

import 'rxjs/add/operator/map';
import { ClubCardComponent } from '../clubs/club-card/club.card.component';
import { Credit } from '../../models/credit.model';
import { Club } from '../../models/club.model';
import { Sale } from './../../models/sales.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'add-sale',
    templateUrl : 'add-sale.html'
})
export class AddSaleComponent{
    formData : FormGroup;
    sale = new Sale();
  
     constructor(private fBuilder : FormBuilder, private http: Http, 
     private managerService: ManagerService, private navCtrl : NavController,
      private alertCtrl: AlertController, private cameraService: CameraService,
       public actionSheetCtrl: ActionSheetController) {
        this.formData = fBuilder.group ({
            'id' :Date.now(),
            'name': ["", Validators.required],
            'description' : ["", Validators.required],
            'price' : ["", Validators.required],
            'points' : ["", Validators.required],
            'img': [""],
            
        })
     }

 addingSale(){
        this.sale.id =  this.formData.value.id;
        //this.sale.img //.= this.formData.value.img;
        this.sale.name = this.formData.value.name;
        this.sale.points = this.formData.value.points;
        this.sale.description = this.formData.value.description;
        this.sale.price = this.formData.value.price;
        console.log("Added sale = "+this.sale);
        this.managerService.addSale(this.managerService.getLocalManager().clubId, this.sale);  
        this.presentAlert();

    }

    presentAlert(){
    let alert = this.alertCtrl.create({
        subTitle: 'sale added to club succecfully',
        buttons: ['סבבה']
    });
       alert.present();
       alert.onDidDismiss(() => {
       this.navCtrl.pop();
       });
    }

    // onBlur(event){
    //     var formName = event.target.attributes['formControlName'].value;
 
    // }

            // to do
    updateImg(url) {
        console.log("in save img")
        this.sale.img = url;
    }
        
    onClickOpenCameraOptionTake() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Choose Camera Option',
            buttons: [
                {
                    text: 'Camera',
                    role: 'destructive',
                    handler: () => {
                        this.onClickTakePhoto();
                    }
                },
                {
                    text: 'Photo Libary',
                    handler: () => {
                        this.onClickGetPhotoFromGallery();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present();
    }

    onClickTakePhoto() {
        this.cameraService.takePhotoFromCamera()
            .then(url => {
                this.updateImg(url)
            })
            .catch(err => {
                console.log("err to take picture", err);
                // handle error
            })
    }

    onClickGetPhotoFromGallery() {
        this.cameraService.choosePhotoFromGallery()
            .then(url => {
                this.updateImg(url);
            })
            .catch(err => {
                console.log("err to take picture", err);
                // handle error
            })
    }
}