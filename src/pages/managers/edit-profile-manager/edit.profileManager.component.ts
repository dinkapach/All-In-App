import { EditProfileManagerBaseComponent } from './edit.profile.manager.base.component';
import { CloneService } from './../../../helpers/clone-service';
import { ManagerService } from './../../../services/manager.service';
import { Manager } from './../../../models/manager.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'edit-profileManager',
    templateUrl : 'edit.profile.manager.base.html'
})
export class EditProfileManagerComponent extends EditProfileManagerBaseComponent{ 

    constructor(public fBuilder : FormBuilder, public navCtrl : NavController,
        public managerService: ManagerService, public navParams: NavParams,  
        public cloneService: CloneService) {

        super(fBuilder, cloneService, managerService.getLocalManager());
    }

    // when click edit profile, updated in DB
    onClickUpdateInfo() {
        this.managerService.updateManager(this.updatedManager)
        .subscribe(isAuth => {
            if(isAuth){
                this.loadFormValuesFromUpdatedManagerToManager();
                alert("Profile Updated");
                this.navCtrl.pop();
            }
            else{
                alert("Updated failed");
            }
        })
    }
}