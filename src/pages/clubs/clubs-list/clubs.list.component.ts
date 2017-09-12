import { Club } from './../../../models/club.model';
import { ClubService } from './../../../services/club.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ViewController } from "ionic-angular";

@Component({
    selector : 'clubs-list',
    templateUrl : 'clubs.list.html'
})
//this component present the list of clubs to choose to adding club that existing in the DB
//when we did the functionality of adding club by scan QR code, we downloaded this component.
//it's still here in case that we'll want faster access to add club for debugging
export class ClubsListComponent implements OnInit{
    clubs: Club[];

    constructor(private clubService : ClubService, private viewCtrl : ViewController) {
    }

    ngOnInit() {
        this.clubService.getClubs()
        .subscribe( res => {
            this.clubs = res;
        })
    }

    onClubClicked(club : Club) {
        this.viewCtrl.dismiss(club);
    }

    clickClose() {
        this.viewCtrl.dismiss();
    }
}