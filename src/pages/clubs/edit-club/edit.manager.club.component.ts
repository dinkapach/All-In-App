import { CloneService } from './../../../helpers/clone-service';
import { EditClubBaseComponent } from './edit.club.base.component';
import { Club } from './../../models/club.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { ManagerService } from "../../../services/manager.service";
import { ActionSheetCameraOptions } from "../../../helpers/action-sheet-camera-options";


@Component({
    selector: 'edit-manager-club',
    templateUrl : 'edit.club.base.html'
})
export class EditManagerClubComponent extends EditClubBaseComponent{

    constructor(public fBuilder : FormBuilder, public navCtrl : NavController,
        private managerService: ManagerService, public navParams: NavParams, 
        public alertCtrl: AlertController, public cloneService: CloneService,
        public actionSheetCameraOptions: ActionSheetCameraOptions) {
            super(navCtrl, fBuilder,cloneService, actionSheetCameraOptions, managerService.getLocalClub())
    }

    onClickupdateInfo() {
        this.managerService.updateClub(this.updatedClub)
        .subscribe(isAuth => {
            if(isAuth){
                // this function is in the super component
                this.updateClub();
                this.navCtrl.pop();
            }
            else{
            }
        })
    }

}