import { ActionSheetCameraOptions } from './../../../helpers/action-sheet-camera-options';
import { Club } from './../../../models/club.model';
import { SuperManagerService } from './../../../../services/superManager.service';
import { NavController } from 'ionic-angular';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CameraService } from "../../../helpers/camera-service";
import { CloneService } from "../../../helpers/clone-service";

@Component({
    selector: 'edit-club-base',
    templateUrl: 'edit.club.base.html'
})
export class EditClubBaseComponent {
    club: Club;
    updatedClub: Club = new Club();
    formData: FormGroup;

    constructor(public navCtrl: NavController, public fBuilder: FormBuilder,
        public cloneService: CloneService, public actionSheetCameraOptions: ActionSheetCameraOptions,
        public clubIn: Club) {
        this.club = clubIn;
        this.updatedClub = this.cloneService.getDeepCopyOfClub(this.club);
        this.buildForm();
        this.loadFormValuesFromUser();
    }

    buildForm() {
        this.formData = this.fBuilder.group({
            'name': ["", Validators.required],
            'address': ["", Validators.required],
            'phoneNumber': ["", Validators.required],
            'openingHour': ["", Validators.required],
            'closingHour': ["", Validators.required],
        });
    }

    loadFormValuesFromUser() {
        Object.keys(this.formData.controls).forEach(key => {
            console.log(key);
            this.formData.controls[key].setValue(this.club[key]);
        });
    }

    onClickOpenCameraOptionTake() {
        this.actionSheetCameraOptions.onClickOpenOptionTakeImgModal()
        this.actionSheetCameraOptions.onPhotoTaken.subscribe(res => {
            if (res.isAuth) {
                this.updateImg(res.url);
            }
        })
    }

    updateImg(url) {
        console.log("in save img")
        this.updatedClub.img = url;
    }

    updateClub() {
        Object.keys(this.updatedClub).forEach(key => {
            let value = this.updatedClub[key];
            console.log(value);
            this.club[key] = this.updatedClub[key];
        });
    }
}