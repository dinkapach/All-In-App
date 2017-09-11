import { CameraService } from './../../../helpers/camera-service';
import { Receipt } from './../../../models/receipt.model';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Club } from './../../../models/club.model';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'receipt-scan',
    templateUrl: 'receipt.scan.html'
})
export class ScanReceiptComponent implements OnInit {
    user: User;
    isManual: boolean;
    receipt: Receipt;
    photos: any[];
    clubReceiptArr: any[];
    @Input()
    club: any;

    constructor(public navCtrl: NavController, private sanitizer: DomSanitizer,
        private userService: UserService, private navParams: NavParams, private alertCtrl: AlertController,
        private cameraServie: CameraService) {
        this.user = this.userService.getLocalUser();
        this.receipt = new Receipt();
    }

    ngOnInit() {
        console.log("from scan receipt, is manual: ", this.club);
        // take from the photos that belong to this club
        this.clubReceiptArr = [];
        this.photos = [];
        this.clubReceiptArr = this.user.receipts.filter(currentReceipt => {
            return currentReceipt.clubId == this.club.id
        });
        console.log(this.clubReceiptArr.length);
        if (this.clubReceiptArr.length > 0) {
            this.clubReceiptArr.forEach(currClubReceipt => {
                this.photos.push(currClubReceipt.img);
            });
        }
        else {
            this.photos = [];
        }
    }

    onClickDeletePhoto(photo) {
        //prompt user to delete image
        let confirm = this.alertCtrl.create({
            title: 'Sure you want to delete this photo? There is NO undo!',
            message: '',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        console.log('Agree clicked');
                        this.photos = this.photos.filter(currPhoto => {
                            return currPhoto != photo;
                        })
                        this.user.receipts = this.user.receipts.filter(currReceipt => {
                            return currReceipt.img != photo;
                        })

                        console.log(this.user.receipts);

                        this.userService.updateUser(this.user)
                            .subscribe(isUpdated => {
                                if (isUpdated) {
                                    console.log("Photo delted from user");
                                }
                                else {
                                    console.log("photo not deleted from customer")
                                }
                            })
                    }
                }
            ]
        });
        confirm.present();
    }

    onClickFromGallery() {
        this.cameraServie.choosePhotoFromGallery()
            .then(url => {
                this.saveReceiptToUser(url);
            })
            .catch(err => {
                console.log("err from onClickFromGallery: ", err);
            })
    }

    onClickTakePhoto() {
        this.cameraServie.takePhotoFromCamera()
            .then(url => {
                this.saveReceiptToUser(url);
            })
            .catch(err => {
                console.log("err from onClickTakePhoto:", err);
            });
    }

    saveReceiptToUser(url) {
        console.log("grom scan receipt, the url is: ", url);
        this.photos.push(url);
        this.photos.reverse();
        this.receipt.clubId = this.club.id;
        this.receipt.img = url;
        this.receipt.isManual = this.isManual;
        this.user.receipts.push(this.receipt);
        this.userService.updateUser(this.user)
            .subscribe(isUpdated => {
                if (isUpdated) {
                    alert("Picture saved succesfully");
                    console.log("receipt", this.receipt);
                }
                else {
                    alert("Unable to save picture");
                }
            })
    }
}