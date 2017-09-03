import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { Manager } from '../../models/manager.model';
import { CameraService } from '../../helpers/camera-service';
import { ManagerService } from '../../services/manager.service';
//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'edit-profileManager',
    templateUrl : 'edit.profileManager.html'
})
export class EditProfileManagerComponent{
    manager: Manager;
    updatedManager: any = {};
    formData : FormGroup;
    isUrlImg: boolean;

    //     id: number;
    // userName: string;
    // firstName: string;
    // lastName: string;
    // password: string;
    // email: string;
    // clubId: string;
    // permissions: string;

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private managerService: ManagerService, private navParams: NavParams, private alertCtrl: AlertController, 
        private cameraService: CameraService) {
        this.manager = this.managerService.getLocalManager();

        // this.formData.controls['email'].setValue("din@gmail.com");
        this.updatedManager = { };

        this.formData = fBuilder.group({
            'id': ["", Validators.required],
            'userName': ["", Validators.required],
            'firstName': ["", Validators.required],
            'lastName': ["", Validators.required],
            'email': ["", Validators.required],
        })
        console.log(this.formData.controls);
        this.loadFormValuesFromManager();
    }

    loadFormValuesFromManager(){
        Object.keys(this.formData.controls).forEach(key => {
            // let value = this.updatedUser[key];
            console.log(key);
            this.formData.controls[key].setValue(this.manager[key]);
         });
    }

    onClickTest(){
        console.log(this.updatedManager);
        this.updateManager();
    }

   

    onClickupdateInfo() {
        this.managerService.updateManager(this.updatedManager)
        .subscribe(isAuth => {
            console.log(isAuth);
            if(isAuth){
                this.updateManager();
                this.showAlert("Profile Updated" + isAuth);
                console.log(isAuth);
                this.navCtrl.pop();
            }
            else{
                this.showAlert("Updated failed"+isAuth);
            }
        })
    }

    updateManager(){
        Object.keys(this.updatedManager).forEach(key => {
            let value = this.updatedManager[key];
            console.log(value);
            this.manager[key] = this.updatedManager[key];
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
        this.updatedManager[formName] = this.formData.value[formName];
    }
}