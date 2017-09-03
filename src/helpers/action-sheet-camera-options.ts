import { CameraService } from './camera-service';
import { Observable } from 'rxjs/Observable';
import { AlertController, ActionSheetController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class ActionSheetCameraOptions {

    constructor(private alertCtrl: AlertController, private camera: Camera,
        public actionSheetCtrl: ActionSheetController, private cameraService: CameraService) {

    }

    onClickOpenOptionTakeImgModal(paramToUpdate) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Modify your album',
            buttons: [
                {
                    text: 'Camera',
                    role: 'destructive',
                    handler: () => {
                        this.onClickTakePhoto(paramToUpdate);
                    }
                },
                {
                    text: 'Photo Libary',
                    handler: () => {
                        this.onClickGetPhotoFromGallery(paramToUpdate);
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
    
    onClickTakePhoto(paramToUpdate) {
        this.cameraService.takePhotoFromCamera()
            .then(url => {
                this.saveImgInUpdaatedUser(paramToUpdate, url)
            })
            .catch(err => {
                console.log("err to take picture", err);
                // handle error
            })
    }

     onClickGetPhotoFromGallery(paramToUpdate) {
        this.cameraService.choosePhotoFromGallery()
            .then(url => {
                this.saveImgInUpdaatedUser(paramToUpdate, url);
            })
            .catch(err => {
                console.log("err to take picture", err);
                // handle error
            })
    }

    saveImgInUpdaatedUser(paramToUpdate, url) {
        console.log("in save img")
        paramToUpdate.img = url;
    }




}