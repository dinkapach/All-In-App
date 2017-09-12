import { ActionSheetCameraOptions } from './../../../../helpers/action-sheet-camera-options';
import { CloneService } from './../../../../helpers/clone-service';
import { CameraService } from './../../../../helpers/camera-service';
import { User } from './../../../../models/user.model';
import { ClubManually } from './../../../../models/clubManually.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { UserService } from './../../../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'club-manual-edit',
    templateUrl: 'club.manual.edit.html',
})
export class EditClubManuallyComponent {
    user: User;
    updatedClub: ClubManually;
    club: ClubManually;
    editClubForm: FormGroup;
    clubId: number;

    constructor(private fBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams,
        private alertCtrl: AlertController, private userService: UserService, private cameraService: CameraService,
        public actionSheetCtrl: ActionSheetController, private cloneService: CloneService,
        private actionSheetCameraOptions: ActionSheetCameraOptions) {
        this.club = this.navParams.get("club");
        this.updatedClub = this.cloneService.getDeepCopyOfClubManually(this.club);
        this.user = this.userService.getLocalUser();
        this.buildForm();
    }

    buildForm() {
        this.editClubForm = this.fBuilder.group({
            'name': ["", Validators.required],
            'address': [""],
            'phoneNumber': [""],
            'points': [""],
        })
    }

    // when click 'edit club', save the updated club to user
    onClickEditClub() {
        this.getUpdatedClub()
        this.userService.updateUser(this.user)
            .subscribe(isAuth => {
                if (isAuth) {
                    this.navCtrl.pop();
                }
                else {
                    alert("edit failed");
                }
            });
    }

    getUpdatedClub() {
        this.user.manuallyClubs = this.user.manuallyClubs.filter(clubManual => {
            return clubManual.id != this.club.id;
        })
        this.user.manuallyClubs.push(this.updatedClub);
    }

    // the option is camera or gallery
    onClickOpenCameraOptionTake() {
        this.actionSheetCameraOptions.onClickOpenOptionTakeImgModal()
        this.actionSheetCameraOptions.onPhotoTaken.subscribe(res => {
            if (res.isAuth) {
                this.updateImg(res.url);
            }
        })
    }

    updateImg(url) {
        this.updatedClub.img = url;
    }
}
