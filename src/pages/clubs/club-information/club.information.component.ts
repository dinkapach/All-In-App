import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

// this class present the club information

@Component({
    selector: 'club-information',
    templateUrl: 'club.information.html'
})
export class ClubInformation {
    club: any; // club Or clubManually
    detailsToPresent;
    
    constructor(public platform: Platform, public params: NavParams,
        public viewCtrl: ViewController) {
        this.club = this.params.get('club')
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}