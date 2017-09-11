import { EditClubBaseComponent } from './edit.club.base.component';
import { CameraService } from './../../../../helpers/camera-service';
import { Club } from './../../../../models/club.model';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CloneService } from "../../../helpers/clone-service";
import { SuperManagerService } from "../../../services/superManager.service";
import { ActionSheetCameraOptions } from "../../../helpers/action-sheet-camera-options";

@Component({
    selector: 'edit-club',
    templateUrl: 'edit.club.base.html'
})
export class EditClubComponent extends EditClubBaseComponent {

    constructor(public navCtrl: NavController, public alertCtrl: AlertController,
        public superManagerService: SuperManagerService, public navParams: NavParams,
        public cloneService: CloneService, public fBuilder: FormBuilder,
        public actionSheetCameraOptions: ActionSheetCameraOptions) {
        super(navCtrl, fBuilder, cloneService, actionSheetCameraOptions, navParams.get("club"))
    }

    onClickupdateInfo() {
        console.log("edited manager: ", this.updatedClub);
        this.superManagerService.updateClub(this.updatedClub)
            .subscribe(isUpdated => {
                if (isUpdated) {
                    this.updateClub();
                    alert("club edited");
                }
                else {
                    console.log("club was not updated");
                }
            })
    }

    updateClub() {
        Object.keys(this.updatedClub).forEach(key => {
            let value = this.updatedClub[key];
            console.log(value);
            this.club[key] = this.updatedClub[key];
        });
    }
}