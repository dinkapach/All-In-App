import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { LocalNotifications } from '@ionic-native/local-notifications';
import 'rxjs/add/operator/map';
import { User } from '../../../../models/user.model';
import { Credit } from '../../../../models/credit.model';
import { Club } from '../../../../models/club.model';
import { UserService } from '../../../../services/user.service';
import { CameraService } from '../../../../helpers/camera-service';
import { ActionSheetCameraOptions } from '../../../../helpers/action-sheet-camera-options';


@Component({
    selector: 'add-credit',
    templateUrl: 'add-credit.html'
})
export class AddCreditComponent {
    user: User;
    formData: FormGroup;
    newCredit: Credit;
    club: Club;
    setReminder: boolean = true;

    constructor(private fBuilder: FormBuilder, private http: Http, private navCtrl: NavController,
        private userService: UserService, private navParams: NavParams, private alertCtrl: AlertController,
        private localNotifications: LocalNotifications, private cameraService: CameraService,
        public actionSheetCtrl: ActionSheetController,
        private actionSheetCameraOptions: ActionSheetCameraOptions) {
        
        this.club = this.navParams.get("club"); // get club that the new credit belongs to
        this.initCredit();
        this.user = this.userService.getLocalUser();
        this.buildAddCreditForm();
    }

    // init credit with require values
    initCredit() {
        this.newCredit = new Credit();
        this.newCredit.clubId = this.club.id;
        this.newCredit.id = Date.now();
    }

    buildAddCreditForm() {
        this.formData = this.fBuilder.group({
            'dateOfPurchase': ["", Validators.required],
            'dateOfExpired': ["", Validators.required],
            'setReminder': ["", Validators.required],
            'totalCredit': ["", Validators.required]
        });
    }

    // when click add credit, save it in DB
    onClickAddCredit() {
        this.userService.addCredit(this.newCredit).
            subscribe(isAuth => {
                if (isAuth) {
                    this.scheduleCreditNotification();
                    this.navCtrl.pop();
                }
                else {
                    console.log("unSuccess");
                }
            })
    }

    scheduleCreditNotification() {
        if (this.setReminder) {
            this.localNotifications.schedule({
                title: "Credit About To Expire",
                id: this.newCredit.id,
                text: "Your credit in " + this.club.name + " is about to expire.",
                at: new Date(this.newCredit.dateOfExpired)
            });
        }
    }

    // the options is camera or gallery
    onClickOpenCameraOptionTake() {
        this.actionSheetCameraOptions.onClickOpenOptionTakeImgModal()
        this.actionSheetCameraOptions.onPhotoTaken.subscribe(res => {
            if (res.isAuth) {
                this.updateImg(res.url);
            }
        })
    }

    updateImg(url) {
        this.newCredit.img = url;
    }
}