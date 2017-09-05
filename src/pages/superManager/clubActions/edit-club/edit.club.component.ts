import { CameraService } from './../../../../helpers/camera-service';
import { CloneService } from './../../../../helpers/clone-service';
import { Club } from './../../../../models/club.model';
import { SuperManagerService } from './../../../../services/superManager.service';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EditCreditComponent } from './../edit-credit/edit-credit.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 

@Component({
    selector: 'edit-club',
    templateUrl: 'edit.club.html'
})
export class EditClubComponent implements OnInit {
   club : Club;
   updatedClub: Club = new Club();
   formData : FormGroup;

    constructor( private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService, private navParams: NavParams,
        private cloneService: CloneService, private fBuilder : FormBuilder, private cameraService: CameraService) {
        this.club = this.navParams.get("club");
        this.updatedClub = this.cloneService.getDeepCopyOfClub(this.club);
        console.log(this.updatedClub);
        this.formData = fBuilder.group({
            'name': ["", Validators.required],
            'address': ["", Validators.required],
            'phoneNumber': ["", Validators.required],
            'openingHour': ["", Validators.required],
            'closingHour': ["", Validators.required],
        })
        this.loadFormValuesFromUser();
    }

    loadFormValuesFromUser(){
        Object.keys(this.formData.controls).forEach(key => {
            console.log(key);
            this.formData.controls[key].setValue(this.club[key]);
         });
    }

    ngOnInit() {

    }

    onClickTakePhoto() {
        this.cameraService.takePhotoFromCamera()
        .then(url => {
            this.updatedClub.img = url;
        })
        .catch(err => {
            console.log("err to take picture", err);
        })
    }

    onClickPhotoFromGallery() {
        this.cameraService.choosePhotoFromGallery()
        .then(url => {
            this.updatedClub.img = url;
        })
        .catch(err => {
            console.log("err to take picture", err);
        })
    }

    onClickupdateInfo(){
        console.log("edited manager: ",this.updatedClub);
        this.superManagerService.updateClub(this.updatedClub)
        .subscribe(isUpdated => {
            if(isUpdated){
                this.updateClub();
                this.presentAlert();
            }
            else{
                console.log("manager was not updated");
            }
        })
    }

    updateClub(){
        Object.keys(this.updatedClub).forEach(key => {
            let value = this.updatedClub[key];
            console.log(value);
            this.club[key] = this.updatedClub[key];
          });
    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            subTitle: 'club edited',
            buttons: ['סבבה']
        });
        alert.present();
        alert.onDidDismiss(() => {
            this.navCtrl.pop();
        });
    }
}