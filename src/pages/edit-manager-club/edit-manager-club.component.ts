import { CameraService } from './../../helpers/camera-service';
import { LoginComponent } from './../login/login.component';
import { AddCreditComponent } from './../add-credit/add-credit.component';
import { ManagerService } from './../../services/manager.service';
import { User } from './../../models/user.model';
import { Club } from './../../models/club.model';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

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
        private cameraService: CameraService) {
        this.club = this.managerService.getLocalClub();
        this.updatedClub = { };

        this.formData = fBuilder.group({
            'name': ["", Validators.required],
            'address': ["", Validators.required],
            'phoneNumber': ["", Validators.required],
            'img': [""],
        })
        console.log(this.formData.controls);
        this.loadFormValuesFromUser();
    }

    loadFormValuesFromUser(){
        Object.keys(this.formData.controls).forEach(key => {
            console.log(key);
            this.formData.controls[key].setValue(this.club[key]);
         });
    }

    onClickTest(){
        console.log(this.updatedClub);
        this.updateClub();
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

    onClickupdateInfo() {
        this.managerService.updateClub(this.updatedClub)
        .subscribe(isAuth => {
            console.log(isAuth);
            if(isAuth){
                this.updateClub();
                this.showAlert("Club Updated" + isAuth);
                console.log(isAuth);
                this.navCtrl.pop();
            }
            else{
                this.showAlert("Updated failed" + isAuth);
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

    showAlert(message){
    let alert = this.alertCtrl.create({
    //   title: 'Title!',
      subTitle: message,
      buttons: ['סבבה']
    });
    alert.present();
    }

    onBlur(event){
        var formName = event.target.attributes['formControlName'].value;
        this.updatedClub[formName] = this.formData.value[formName];
    }
}