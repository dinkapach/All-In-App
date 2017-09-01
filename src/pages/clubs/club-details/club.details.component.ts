import { ClubDetailsBaseComponent } from './club.details.base.component';
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
    selector: 'club-details',
    templateUrl: 'club.details.html'
})
export class ClubDetailsComponent extends ClubDetailsBaseComponent implements OnInit {
//    club: Club;
    // barcodeData : string;
    // user: User

    constructor(public navParams: NavParams,
        public navCtrl: NavController, public userService: UserService, 
        public clubService: ClubService, public alertCtrl: AlertController) {
            super(navParams, navCtrl, userService, clubService, alertCtrl);
            //this.user = this.userService.getLocalUser();
    }

    ngOnInit() {
       // this.club = this.navParams.get("club");
    }

    // deleteClub() { // TODO, if we in this component then the club isnt manual
    //     if(this.club.isManual){
    //         this.clubService.deleteClubFromCustomer(this.club)
    //         .subscribe(response => {
    //             if (response.isUpdated) {
    //                 console.log("updated");
    //                 // this.user = response.user;
    //                 let alert = this.alertCtrl.create({
    //                     subTitle: 'Club deleted',
    //                     buttons: ['סבבה']
    //                 });
    //             alert.present();
    //             alert.onDidDismiss(() => {
    //                 this.navCtrl.pop();
    //             });
    //             }
    //             else {
    //                 console.log("not updated");
    //             }
    //         })
    //     }
    //     else {
    //         let alert = this.alertCtrl.create({
    //             subTitle: "Can't delete club that you didnt add manually ",
    //             buttons: ['סבבה']
    //         });
    //     alert.present();
    //     }
    // }

    // onClickReceipts() {
    //     let isManual = false;
    //     this.navCtrl.push(ScanReceiptComponent, {club: this.club , isManual : isManual });



    //     // this.barcodeScanner.scan().then((barcodeData) => {
    //     //     console.log(barcodeData);
    //     //     this.barcodeData = JSON.stringify(barcodeData);
    //     // }, (err) => {
    //     //     console.log(err);            
    //     //     this.barcodeData = JSON.stringify(err);
    //     // });
    // }

    // showReceipts(){
    //     console.log("in show recipts");
    // }

    // addCredit(){
    //      this.navCtrl.push(AddCreditComponent, {club: this.club});
    // }

    // showCredits(){
    //     let creditByClubsArr = [];
    //     this.user.credits.forEach( credit => {
    //         if(credit.clubId == this.club.id){
    //             creditByClubsArr.push(credit);
    //         }
    //     })

    //     console.log("From club.details.component, 'showCredits', print- creditByClubsArr: ", creditByClubsArr);
    //     this.navCtrl.push(ShowCreditsComponent, {creditArr: creditByClubsArr});
    // }

}