import { EventEmitter } from '@angular/core';
import { CameraService } from './camera-service';
import { Observable } from 'rxjs/Observable';
import { AlertController, ActionSheetController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

// this class prived us the action sheet that present the option to get photo,
// whether from camera or gallery.
// when another component ask for this service, the user need to choose the option,
// after the user choose an option and get the photo, this components notify when the url is ready


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
                // notify the url is ready and pass the url for the component that ask for it
                this.onPhotoTaken.emit({isAuth: true, url: url});
            })
            .catch(err => {
                // notify the error
                this.onPhotoTaken.emit({isAuth: false, err: err});
                console.log("err to take picture", err);
            })
    }

     onClickGetPhotoFromGallery() {
        this.cameraService.choosePhotoFromGallery()
            .then(url => {
                // notify the url is ready and pass the url for the component that ask for it
                this.onPhotoTaken.emit({isAuth: true, url: url});
            })
            .catch(err => {
                // notify the error
                this.onPhotoTaken.emit({isAuth: false, err: err});
                console.log("err to take picture", err);
            })
    }


}