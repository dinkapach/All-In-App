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
// this component present the club card in the dashboard/home page (the page after login)
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
        this.getUserPointsByClubId();
    }

    // when click on the icon of information, open the modal that present the club inforamtion
    onClickPresentClubInfo(club) {
        let modal = this.modalCtrl.create(ClubInformation, club);
        modal.present();
    }

    // get points in every club 
    //in club cards we present the points the user have in every club
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

    // when click on club, move to the club deatails component (the page that present sales/credits/receipt) 
    onClubClicked() {
      this.navCtrl.push(ClubDetailsComponent, {club : this.club});
    }
}