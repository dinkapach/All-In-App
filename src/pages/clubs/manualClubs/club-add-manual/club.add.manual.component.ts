import { CameraService } from './../../../../helpers/camera-service';
import { UserService } from './../../../../services/user.service';
import { NavController, NavParams, AlertController, ActionSheetController} from 'ionic-angular';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './../../../../models/user.model';
import { ClubManually } from './../../../../models/clubManually.model'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 

@Component({
    selector: 'club-add-manual',
    templateUrl: 'club.add.manual.html'
})
export class AddClubManualComponent {
    user: User;
    clubNew: ClubManually;
    addClubForm : FormGroup;

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private userService: UserService, private navParams: NavParams, private alertCtrl: AlertController,
        private cameraService: CameraService, public actionSheetCtrl: ActionSheetController) {
        this.user = this.userService.getLocalUser();
        this.clubNew = new ClubManually();
        this.clubNew.isManual = true;
        this.initNewClub();
        this.buildForm();
    }

    initNewClub(){
        this.clubNew = new ClubManually();
        this.clubNew.isManual = true;
        this.clubNew.id = Date.now();
    }

    buildForm(){
        this.addClubForm = this.fBuilder.group({
            'name': ["", Validators.required],
            'address': [""],
            'phoneNumber': [""],
            // 'img': [""],
            'points': [""],
        });
    }

    onClickAddClub() {
        console.log(this.clubNew);
        this.user.manuallyClubs.push(this.clubNew);
        this.userService.updateUser(this.user)
        .subscribe(isUpdated => {
            if (isUpdated) {
                console.log("updated");
                this.navCtrl.pop();
            }
            else {
                console.log("not updated");
            }
        });
    }

            // to do
            updateImg(url) {
                console.log("in save img")
                this.clubNew.img = url;
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