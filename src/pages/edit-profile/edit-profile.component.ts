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

//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'edit-profile',
    templateUrl: 'edit-profile.html'
})
export class EditProfileComponent {
    user: User;
    updatedUser: any = {};
    formData: FormGroup;
    isUrlImg: boolean;


    constructor(private fBuilder: FormBuilder, private http: Http, private navCtrl: NavController,
        private userService: UserService, private navParams: NavParams, private alertCtrl: AlertController,
        public modalCtrl: ModalController, private cameraService: CameraService,
        public actionSheetCtrl: ActionSheetController) {
        this.user = this.userService.getLocalUser();

        // this.formData.controls['email'].setValue("din@gmail.com");
        this.updatedUser = {};
        this.updatedUser.img = this.user.img;

        this.formData = fBuilder.group({
            'id': ["", Validators.required],
            'firstName': ["", Validators.required],
            'lastName': ["", Validators.required],
            'address': ["", Validators.required],
            'email': ["", Validators.required],
            'phoneNumber': ["", Validators.required],
            'birthday': ["", Validators.required],
            'img': [""],
        })
        console.log(this.formData.controls);
        this.loadFormValuesFromUser();
    }

    loadFormValuesFromUser() {
        Object.keys(this.formData.controls).forEach(key => {
            // let value = this.updatedUser[key];
            console.log(key);
            this.formData.controls[key].setValue(this.user[key]);
        });
    }

    onClickTest() {
        console.log(this.updatedUser);
        this.updateUser();
    }




    onClickupdateInfo() {
        this.userService.updateUser(this.updatedUser)
            .subscribe(isAuth => {
                console.log(isAuth);
                if (isAuth) {
                    this.updateUser();
                    this.showAlert("Profile Updated" + isAuth);
                    console.log(isAuth);
                    this.navCtrl.pop();
                }
                else {
                    this.showAlert("Updated failed" + isAuth);
                }
            })
    }

    updateUser() {
        Object.keys(this.updatedUser).forEach(key => {
            let value = this.updatedUser[key];
            console.log(value);
            this.user[key] = this.updatedUser[key];
        });
    }

    showAlert(message) {
        let alert = this.alertCtrl.create({
            //   title: 'Title!',
            subTitle: message,
            buttons: ['סבבה']
        });
        alert.present();
    }

    onBlur(event) {
        var formName = event.target.attributes['formControlName'].value;
        this.updatedUser[formName] = this.formData.value[formName];
    }

    // onClickOpenOptionTakeImgModal() {
    //     this.actionSheetCameraOptions.onClickOpenOptionTakeImgModal(this.updateUser)
    // }

    // to do
    updateImg(url) {
        console.log("in save img")
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
                // handle error
            })
    }

    onClickGetPhotoFromGallery() {
        this.cameraService.choosePhotoFromGallery()
            .then(url => {
                this.updateImg(url);
            })
            .catch(err => {
                console.log("err to take picture", err);
                // handle error
            })
    }

}