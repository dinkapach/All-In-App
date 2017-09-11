import { CameraService } from './../../../../helpers/camera-service';
import { Club } from './../../../../models/club.model';
import { SuperManagerService } from './../../../../services/superManager.service';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'add-club',
    templateUrl: 'add.club.html'
})
export class AddClubComponent {
    formData: FormGroup;
    isAddClub: boolean;
    newClub: Club = new Club();
    managerId: number;
    TempOpeningHours: [Date, Date];

    constructor(private fBuilder: FormBuilder, private navParams: NavParams,
        private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService, private cameraService: CameraService) {
        this.initClub();
        this.buildForm();
    }

    buildForm() {
        this.formData = this.fBuilder.group({
            'managerId': ["", Validators.required],
            'id': ["", Validators.required],
            'name': ["", Validators.required],
            'address': ["", Validators.required],
            'phoneNumber': ["", Validators.required],
            'openingHour': "",
            'closingHour': ""
        });
    }

    initClub() {
        this.newClub = new Club();
        this.newClub.openingHours = ["", ""];
        this.newClub.isManual = false;
        this.newClub.branches = [];
        this.newClub.sales = [];
        this.newClub.usersClub = [];
        this.newClub.img = "";
    }

    onClickAddClub() {
        console.log("from add club");
        console.log("newClub: ", this.newClub);
        this.superManagerService.createClubAndAddToManager(this.newClub, this.managerId)
            .subscribe(isCreated => {
                if (isCreated) {
                    console.log("club create succecfully");
                    alert("club added");
                }
                else {
                    console.log("cuold not create manager");
                }
            });
    }

    onClickTakePhoto() {
        this.cameraService.takePhotoFromCamera()
            .then(url => {
                this.newClub.img = url;
            })
            .catch(err => {
                console.log("err to take picture", err);
            })
    }

    onClickPhotoFromGallery() {
        this.cameraService.choosePhotoFromGallery()
            .then(url => {
                this.newClub.img = url;
            })
            .catch(err => {
                console.log("err to take picture", err);
            })
    }
}