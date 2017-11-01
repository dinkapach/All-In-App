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
        this.updatedClub = this.cloneService.getDeepCopyOfClub(this.club); // clone club object that use for editing
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
            this.formData.controls[key].setValue(this.club[key]);
        });
    }

    // open the option to choose photo- from camera or gallery
    onClickOpenCameraOptionTake() {
        this.actionSheetCameraOptions.onClickOpenOptionTakeImgModal()
        this.actionSheetCameraOptions.onPhotoTaken.subscribe(res => {
            if (res.isAuth) {
                this.updateImg(res.url);
            }
        })
    }

    updateImg(url) {
        this.updatedClub.img = url;
    }

    // update the club after edited
    updateClub() {
        Object.keys(this.updatedClub).forEach(key => {
            let value = this.updatedClub[key];
            this.club[key] = this.updatedClub[key];
        });
    }
}