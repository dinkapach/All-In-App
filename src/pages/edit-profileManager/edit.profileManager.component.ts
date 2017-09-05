import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Manager } from '../../models/manager.model';
import { CameraService } from '../../helpers/camera-service';
import { ManagerService } from '../../services/manager.service';
import { CloneService } from '../../helpers/clone-service';

@Component({
    selector: 'edit-profileManager',
    templateUrl : 'edit.profileManager.html'
})
export class EditProfileManagerComponent{
    manager: Manager;
    updatedManager: any = {};
    formData : FormGroup;

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private managerService: ManagerService, private navParams: NavParams, private alertCtrl: AlertController, 
        private cameraService: CameraService, private cloneService: CloneService) {
        this.manager = this.managerService.getLocalManager();

        // this.formData.controls['email'].setValue("din@gmail.com");
        this.updatedManager = cloneService.getDeepCopyOfManager(this.manager);
        this.buildEditProfileForm();
        console.log(this.formData.controls);
    }

    buildEditProfileForm(){
        this.formData = this.fBuilder.group({
            // 'id': ["", Validators.required],
            // 'userName': ["", Validators.required],
            'firstName': ["", Validators.required],
            'lastName': ["", Validators.required],
            'email': ["", Validators.required],
        })
    }

    loadFormValuesFromUpdatedManagerToManager(){
        this.cloneService.cloneObject(this.updatedManager, this.manager);
    }

    onClickUpdateInfo() {
        this.managerService.updateManager(this.updatedManager)
        .subscribe(isAuth => {
            console.log(isAuth);
            if(isAuth){
                this.loadFormValuesFromUpdatedManagerToManager();
                alert("Profile Updated");
                console.log(isAuth);
                this.navCtrl.pop();
            }
            else{
                alert("Updated failed");
            }
        })
    }
}