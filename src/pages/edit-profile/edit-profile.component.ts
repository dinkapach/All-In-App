import { ActionSheetCameraOptions } from './../../helpers/action-sheet-camera-options';
import { CameraService } from './../../helpers/camera-service';
import { ModalOptionTakeImg } from './../modal-take-img-options/modal.take.img.options.component';
import { LoginComponent } from './../login/login.component';
import { AddCreditComponent } from './../add-credit/add-credit.component';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController, ModalController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { CloneService } from '../../helpers/clone-service';

//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'edit-profile',
    templateUrl: 'edit-profile.html'
})
export class EditProfileComponent {
    user: User;
    updatedUser: User;
    formData: FormGroup;

    constructor(private fBuilder: FormBuilder, private http: Http, private navCtrl: NavController,
        private userService: UserService, private navParams: NavParams, private alertCtrl: AlertController,
        public modalCtrl: ModalController, private cameraService: CameraService,
        public actionSheetCtrl: ActionSheetController, private cloneService: CloneService) {
        this.user = this.userService.getLocalUser();
        this.updatedUser = this.cloneService.getDeepCopyOfCustomer(this.user);
        // console.log("in update cutomer profile");
        // console.log("customer: ", this.user);
        // console.log("updatedUser: ", this.updatedUser);
        this.buildForm();
    }

    buildForm(){
        // console.log("updating cutomer profile");
        // console.log("customer: ", this.user);
        // console.log("updatedUser: ", this.updatedUser);
        this.formData = this.fBuilder.group({
            'firstName': ["", Validators.required],
            'lastName': ["", Validators.required],
            'address': ["", Validators.required],
            'email': ["", Validators.required],
            'phoneNumber': ["", Validators.required],
            'birthday': ["", Validators.required]
        });
    }

    onClickupdateInfo() {
        this.userService.updateUser(this.updatedUser)
            .subscribe(customer => {
                // console.log(customer);
                if (customer) {
                    this.updateUserFromUpdatedUser();
                    alert("Profile Updated");
                    console.log("profile updated ", customer);
                    this.navCtrl.pop();
                }
                else {
                    console.log("update customer info faild", customer);
                    alert("Updated failed");
                }
            });
    }

    updateUserFromUpdatedUser() {
        this.cloneService.cloneObject(this.updatedUser, this.user);
    }

    updateImg(url) {
        this.updatedUser.img = url;
    }

    onClickOpenCameraOptionTake() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Choose Camera Option',
            buttons: [
                {
                    text: 'Camera',
                    role: 'destructive',
                    handler: () => {
                        this.onClickTakePhoto();
                    }
                },
                {
                    text: 'Photo Libary',
                    handler: () => {
                        this.onClickGetPhotoFromGallery();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present();
    }

    onClickTakePhoto() {
        this.cameraService.takePhotoFromCamera()
            .then(url => {
                this.updateImg(url)
            })
            .catch(err => {
                console.log("err to take picture", err);
                alert("error");
            })
    }

    onClickGetPhotoFromGallery() {
        this.cameraService.choosePhotoFromGallery()
            .then(url => {
                this.updateImg(url);
            })
            .catch(err => {
                console.log("err to take picture", err);
                alert("error");
            })
    }
}