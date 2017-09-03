import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';


@Component({
    selector: 'club-information',
    templateUrl: 'club.information.html'
})
export class ClubInformation implements OnInit {
    club: any; // club Or clubManually
    detailsToPresent;
    

    constructor(public platform: Platform, public params: NavParams,
        public viewCtrl: ViewController) {
        this.club = this.params.get('club')
        this.initDetailsToPresent();
    }

    ngOnInit() {
    }

    // *getValuesOfObject(object) {
    //     for (let key of Object.keys(object)) {
    //         yield object[key];
    //     }
    // }

    initDetailsToPresent() {
        this.detailsToPresent = [];
        this.detailsToPresent.push({note: "Adddress: " ,content: this.club.address});
        this.detailsToPresent.push({note : "from" , content: this.club.openingHours[0]});
        this.detailsToPresent.push({note : "to" , content: this.club.openingHours[1]});
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}