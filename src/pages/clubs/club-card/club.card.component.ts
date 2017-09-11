import { ClubInformation } from './../club-information/club.information.component';
import { UserService } from './../../../services/user.service';
import { ClubManually } from './../../../models/clubManually.model';
import { ClubDetailsComponent } from './../club-details/club.details.component';
import { NavController, ModalController } from 'ionic-angular';
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
    userPoints: number;

    constructor(private navCtrl: NavController, private userService: UserService,
        public modalCtrl: ModalController) {
    }

    ngOnInit() {
        console.log("init club card", this.club);
        this.getUserPointsByClubId();
    }

    onClickPresentClubInfo(club) {
        console.log(club);
        let modal = this.modalCtrl.create(ClubInformation, club);
        modal.present();
    }

    getUserPointsByClubId() {
        this.userService.getUserObjectId()
        .subscribe( res => {
            if(res.isAuth){
                this.club.usersClub.forEach(userClub => {
                    if(userClub.customerId == res.userObjId){
                        this.userPoints = userClub.points;
                    }
                })
            }
            else{
                console.log("err in getUserPointsByClubId");
            }
        })
    }

    onClubClicked() {
        console.log("click!");
      this.navCtrl.push(ClubDetailsComponent, {club : this.club});
    }
}