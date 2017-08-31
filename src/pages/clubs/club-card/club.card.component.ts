import { ClubManually } from './../../../models/clubManually.model';
import { ClubDetailsComponent } from './../club-details/club.details.component';
import { NavController } from 'ionic-angular';
import { Club } from './../../../models/club.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'club-card',
    templateUrl: 'club.card.html'
})
export class ClubCardComponent implements OnInit {
    @Input()
    club: Club;
    @Input()
    subDetailsToPresent: string;

    constructor(private navCtrl: NavController) {
    }

    ngOnInit() {
        console.log("init club card", this.club);
    }

    onClubClicked() {
      this.navCtrl.push(ClubDetailsComponent, {club : this.club});
    }
}