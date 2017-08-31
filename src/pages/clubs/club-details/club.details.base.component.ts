import { ScanReceiptComponent } from './../../receipts/receipt-scan/receipt.scan.component';
import { ClubService } from './../../../services/club.service';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user.model';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Club } from './../../../models/club.model';
import { Component, Input, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AddCreditComponent } from '../../add-credit/add-credit.component';
import { ShowCreditsComponent } from '../../show-credits/show-credits.component';

@Component({
    selector: 'club-details-base',
    templateUrl: 'club.details.html'
})
export class ClubDetailsBaseComponent {
    club: any;
    barcodeData : string;
    user: User;
    viewOptions: string;
    creditArr: any

    constructor(public navParams: NavParams, public barcodeScanner: BarcodeScanner,
        public navCtrl: NavController, public userService: UserService, 
        public clubService: ClubService, public alertCtrl: AlertController) {
            this.user = this.userService.getLocalUser();
            this.club = this.navParams.get("club");
    }

    onClickReceipts() {
        let isManual = false;
        this.navCtrl.push(ScanReceiptComponent, {club: this.club , isManual : isManual });

        // this.barcodeScanner.scan().then((barcodeData) => {
        //     console.log(barcodeData);
        //     this.barcodeData = JSON.stringify(barcodeData);
        // }, (err) => {
        //     console.log(err);            
        //     this.barcodeData = JSON.stringify(err);
        // });
    }


    onClickCredits(){
        this.creditArr = [];
        this.user.credits.forEach( credit => {
            if(credit.clubId == this.club.id){
                this.creditArr.push(credit);
            }
        })
    }

    showCredits(){
        let creditByClubsArr = [];
        this.user.credits.forEach( credit => {
            if(credit.clubId == this.club.id){
                creditByClubsArr.push(credit);
            }
        })

        console.log("From club.details.component, 'showCredits', print- creditByClubsArr: ", creditByClubsArr);
        this.navCtrl.push(ShowCreditsComponent, {creditArr: creditByClubsArr});
    }

}