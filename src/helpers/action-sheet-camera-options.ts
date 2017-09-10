import { EventEmitter } from '@angular/core';
import { CameraService } from './camera-service';
import { Observable } from 'rxjs/Observable';
import { AlertController, ActionSheetController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class ActionSheetCameraOptions {
    public onPhotoTaken = new EventEmitter();

    constructor(private alertCtrl: AlertController, private camera: Camera,
        public actionSheetCtrl: ActionSheetController, private cameraService: CameraService) {

    }

    onClickOpenOptionTakeImgModal() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Modify your album',
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
        return this.cameraService.takePhotoFromCamera()
            .then(url => {
                this.onPhotoTaken.emit({isAuth: true, url: url});
                //this.updateImg(paramToUpdate, url)
            })
            .catch(err => {
                this.onPhotoTaken.emit({isAuth: false, err: err});
                console.log("err to take picture", err);
                // handle error
            })
    }

     onClickGetPhotoFromGallery() {
        this.cameraService.choosePhotoFromGallery()
            .then(url => {
                this.onPhotoTaken.emit({isAuth: true, url: url});
                //this.updateImg(paramToUpdate, url);
            })
            .catch(err => {
                this.onPhotoTaken.emit({isAuth: false, err: err});
                console.log("err to take picture", err);
                // handle error
            })
    }

    // updateImg(paramToUpdate, url) {
    //     console.log("in save img")
    //     paramToUpdate.img = url;
    // }




}