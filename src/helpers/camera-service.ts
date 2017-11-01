import { Observable } from 'rxjs/Observable';
import { UserService } from './../services/user.service';
import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

// the camera service provide us the option to take photo 
// whether its from camera or gallery 
// and also provide the url from the photo that eas taken

@Injectable()
export class CameraService {
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

    // the type of the photo is base64, after we get the photo (whether is was from camera or gallery)
    // we call the server that save the image in Cloudinary
    // (Cloudinary is the server we use to save the photos in base64 and return url)
    private getPhoto(options: CameraOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            this.camera.getPicture(options).then((imageData) => {
                // imageData is a base64 encoded string
                let contentType = 'image/jpeg';
                this.base64Image = 'data:image/jpeg;base64,' + imageData;

                this.userService.saveImg(this.base64Image)
                    .subscribe(res => {
                        if (res.isUpdated) {
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