import { Club } from './../../../../models/club.model';
import { SuperManagerService } from './../../../../services/superManager.service';
import { NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EditClubComponent } from "../../../clubs/edit-club/edit.club.component";

@Component({
    selector: 'club-card-super',
    templateUrl: 'club.card.super.html'
})
export class ClubCardSuperComponent {
    @Input()
    club: Club;
    @Output() clubDeleted = new EventEmitter();

    constructor(private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
    }

    editClubClick(club) {
        this.navCtrl.push(EditClubComponent, { club: club });
    }

    deleteClubClick(club) {
        this.deleteClub(club);
    }

    deleteClub(club) {
        this.superManagerService.deleteClub(club).
            subscribe(isAuth => {
                console.log("From 'delete-manager', print 'isAuth': ", isAuth);
                if (isAuth) {
                    this.clubDeleted.emit(club);
                }
                else {
                    console.log("unSuccess");
                }
            });
    }

    deleteClubFromDBAndRemoveFromManager(managerId, club) {
        this.superManagerService.deleteClubFromDBAndRemoveFromManager(managerId, club).
            subscribe(isAuth => {
                console.log("From 'delete-manager', print 'isAuth': ", isAuth);
                if (isAuth) {
                    this.clubDeleted.emit(club);
                }
                else {
                    console.log("unSuccess");
                }
            });
    }
}