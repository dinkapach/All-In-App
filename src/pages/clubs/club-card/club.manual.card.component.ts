import { ClubInformation } from './../club-information/club.information.component';
import { ClubManualDetailsComponent } from './../club-details/club.manual.details.component';
import { EditClubManuallyComponent } from './../manualClubs/club-manual-edit/club.manual.edit.component';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { ClubManually } from './../../../models/clubManually.model';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'club-manual-card',
    templateUrl: 'club.card.html'
})
export class ClubManualCardComponent implements OnInit {
    user: User;
    userPoints: number;
    @Input()
    club: ClubManually;
    @Input()
    subDetailsToPresent: string;
    @Output() clubDeleted = new EventEmitter();

    constructor(private navCtrl: NavController, private userService: UserService,
        private alertCtrl: AlertController, public modalCtrl: ModalController) {
        this.user = this.userService.getLocalUser();
    }

    ngOnInit() {
        this.userPoints = this.club.points;
    }

    onClubClicked() {
        this.navCtrl.push(ClubManualDetailsComponent, { club: this.club })
    }

    onClickEditClub(club) {
        this.navCtrl.push(EditClubManuallyComponent, { club: club });
    }

    onClickPresentClubInfo(club) {
        let modal = this.modalCtrl.create(ClubInformation, club);
        modal.present();
    }

    onClickDeleteClub(clubToDelete) {
        this.user.manuallyClubs = this.user.manuallyClubs.filter(club => { return club.id != clubToDelete.id })
        this.userService.updateUser(this.user).
            subscribe(isAuth => {
                if (isAuth) {
                    this.clubDeleted.emit(clubToDelete);
                }
                else {
                    console.log("unSuccess");
                }
            })
    }
}