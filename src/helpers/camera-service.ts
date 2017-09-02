import { Observable } from 'rxjs/Observable';
import { UserService } from './../services/user.service';
import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class CameraService {
    //options: CameraOptions;
    private base64Image: string;

    constructor(private alertCtrl: AlertController, private camera: Camera,
        private userService: UserService) {

    }

    choosePhotoFromGallery(): Promise<string> {
        const options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL
        };
        
        return this.getPhoto(options);
    }

    takePhotoFromCamera(): Promise<string> {
        const options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }
        return this.getPhoto(options);
    }

    private getPhoto(options: CameraOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            this.camera.getPicture(options).then((imageData) => {
                // imageData is either a base64 encoded string or a file URI
                // If it's base64:
                let contentType = 'image/jpeg';
                this.base64Image = 'data:image/jpeg;base64,' + imageData;

                this.userService.saveImg(this.base64Image)
                    .subscribe(res => {
                        if (res.isUpdated) {
                            console.log("the return value from take pic:", res.result.url);
                            resolve(res.result.url);
                        }
                        else {
                            reject("Image not updated");
                        }
                    })
            }, (err) => {
                reject(err);
            });
        })
    }


}