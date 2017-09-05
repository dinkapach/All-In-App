import { CameraService } from './../../helpers/camera-service';
import { LoginComponent } from './../login/login.component';
import { AddCreditComponent } from './../add-credit/add-credit.component';
import { ManagerService } from './../../services/manager.service';
import { User } from './../../models/user.model';
import { Club } from './../../models/club.model';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { CloneService } from '../../helpers/clone-service';

//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'edit-manager-club',
    templateUrl : 'edit-manager-club.html'
})
export class EditManagerClubComponent{
    club: Club;
    updatedClub: any = {};
    formData : FormGroup;
    isUrlImg: boolean;

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private managerService: ManagerService, private navParams: NavParams, private alertCtrl: AlertController, 
        private cameraService: CameraService, private cloneService: CloneService, public actionSheetCtrl: ActionSheetController) {
        this.club = this.managerService.getLocalClub();
        this.updatedClub = this.cloneService.getDeepCopyOfClub(this.club);
        this.buildForm();
    }

    buildForm(){
        this.formData = this.fBuilder.group({
            'name': ["", Validators.required],
            'address': ["", Validators.required],
            'phoneNumber': ["", Validators.required],
            'openingHour': ["", Validators.required],
            'closingHour': ["", Validators.required],
        });
    }

    onClickupdateInfo() {
        this.managerService.updateClub(this.updatedClub)
        .subscribe(isAuth => {
            console.log(isAuth);
            if(isAuth){
                this.updateClub();
                alert("Club Updated");
                console.log(isAuth);
                this.navCtrl.pop();
            }
            else{
                alert("Updated failed");
            }
        })
    }

    updateClub(){
        this.cloneService.cloneObject(this.updateClub, this.club);
    }
    // to do
    updateImg(url) {
        console.log("in save img")
        this.updatedClub.img = url;
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