import { CameraService } from './../../../helpers/camera-service';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import { LocalNotifications } from '@ionic-native/local-notifications';
import 'rxjs/add/operator/map';
import { Credit } from "../../../models/credit.model";
import { Club } from '../../../models/club.model';
import { ClubDetailsComponent } from "../../clubs/club-details/club.details.component";
import { DashboardComponent } from "../../dashboard/dashboard.component";

//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'add-credit',
    templateUrl : 'add-credit.html'
})
export class AddCreditComponent{
    user: User;
    formData: FormGroup;
    newCredit: Credit;
    club: Club;
    setReminder: boolean = true;

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private userService: UserService, private navParams: NavParams, private alertCtrl: AlertController,
        private localNotifications: LocalNotifications,  private cameraService: CameraService,
        public actionSheetCtrl: ActionSheetController) {
        this.club = this.navParams.get("club");
        this.initCredit();
        this.user = this.userService.getLocalUser();
        this.buildAddCreditForm();
        this.initLocalNotificationClickEvent();
    }

    initCredit(){
        this.newCredit = new Credit();
        this.newCredit.clubId = this.club.id;
        this.newCredit.id = Date.now();
    }

    initLocalNotificationClickEvent(){
        this.localNotifications.on("click", (notification, state) => {
            let alert = this.alertCtrl.create({
                title: "Notification " + notification.id + " Clicked",
                subTitle: "You just clicked the scheduled notification",
                buttons: ["OK"]
            });
            alert.present();
            alert.onDidDismiss(() => {
                // this.gotoClubPage();
            });
        });
    }

    // gotoClubPage(){
    //     this.navCtrl.popAll();
    //     this.navCtrl.push(DashboardComponent);
    //     this.navCtrl.push(ClubDetailsComponent, {club : this.club});
    // }

    buildAddCreditForm(){
        this.formData = this.fBuilder.group({
            'dateOfPurchase' : ["", Validators.required],
            'dateOfExpired': ["", Validators.required],
            'setReminder' : ["", Validators.required],
            'totalCredit' : ["", Validators.required]
        });
    }

    onClickAddCredit() {
        console.log("From 'add-credit.component'. club id:",  this.club.id);
        this.userService.addCredit(this.newCredit).
        subscribe(isAuth => {
            console.log("From 'add-credit.component', print 'isAuth': ", isAuth);
            if(isAuth){
                this.user.credits.push(this.newCredit);        
                this.scheduleCreditNotification();
                let alert = this.alertCtrl.create({
                    subTitle: 'credit added',
                    buttons: ['סבבי']
                });
            alert.present();
            alert.onDidDismiss(() => {
                this.navCtrl.pop();
            });
            }
            else{
                console.log("unSuccess");
            }
        })
    }

    // onClickAddCredit() {
    //     console.log(this.newCredit.dateOfPurchase);
    //     console.log(this.formData.value);
    //     console.log(new Date(this.newCredit.dateOfPurchase));
    // }

    scheduleCreditNotification(){
        if(this.setReminder){
            this.localNotifications.schedule({
                title: "Credit About To Expire",
                id: this.newCredit.id,
                text: "Your credit in " + this.club.name + " is about to expire.",
                at: new Date(this.newCredit.dateOfExpired)
            });
        }
    }


    //TODO
    updateImg(url) {
        this.newCredit.img = url;
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
                alert("error");
            })
    }

    onClickGetPhotoFromGallery() {
        this.cameraService.choosePhotoFromGallery()
            .then(url => {
                this.updateImg(url);
            })
            .catch(err => {
                console.log("err to take picture", err);
                alert("error");
            })
    }
}