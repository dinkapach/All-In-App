import { Club } from './../../../models/club.model';
import { ClubService } from './../../../services/club.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ViewController } from "ionic-angular";

@Component({
    selector : 'clubs-list',
    templateUrl : 'clubs.list.html'
})
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