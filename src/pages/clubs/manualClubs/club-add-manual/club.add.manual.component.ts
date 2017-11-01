import { ActionSheetCameraOptions } from './../../../../helpers/action-sheet-camera-options';
import { CameraService } from './../../../../helpers/camera-service';
import { UserService } from './../../../../services/user.service';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
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
    addClubForm: FormGroup;

    constructor(private fBuilder: FormBuilder, private http: Http, private navCtrl: NavController,
        private userService: UserService, private navParams: NavParams, private alertCtrl: AlertController,
        private cameraService: CameraService, public actionSheetCtrl: ActionSheetController,
        private actionSheetCameraOptions: ActionSheetCameraOptions) {
        this.user = this.userService.getLocalUser();
        this.clubNew = new ClubManually();
        this.clubNew.isManual = true;
        this.initNewClub();
        this.buildForm();
    }

    // init the new club 
    initNewClub() {
        this.clubNew = new ClubManually();
        this.clubNew.isManual = true;
        // create uniq id
        this.clubNew.id = Date.now();
    }

    buildForm() {
        this.addClubForm = this.fBuilder.group({
            'name': ["", Validators.required],
            'address': [""],
            'phoneNumber': [""],
            'points': [""],
        });
    }

    // when add new club, save it to user 
    onClickAddClub() {
        this.user.manuallyClubs.push(this.clubNew);
        this.userService.updateUser(this.user)
            .subscribe(isUpdated => {
                if (isUpdated) {
                    this.navCtrl.pop();
                }
                else {
                    console.log("not updated");
                }
            });
    }

    // the options are comare or gallery
    onClickOpenCameraOptionTake() {
        this.actionSheetCameraOptions.onClickOpenOptionTakeImgModal()
        this.actionSheetCameraOptions.onPhotoTaken.subscribe(res => {
            if (res.isAuth) {
                this.updateImg(res.url);
            }
        })
    }

    updateImg(url) {
        this.clubNew.img = url;
    }
}