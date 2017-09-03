import { UserService } from './../../../services/user.service';
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
    userPoints: number;

    constructor(private navCtrl: NavController, private userService: UserService) {
        let user = this.userService.getLocalUser();
        this.getUserPointsByClubId(user.id)
    }

    ngOnInit() {
        console.log("init club card", this.club);
    }

    getUserPointsByClubId(userId) {
        // this.club.usersClub.forEach(userClub => {
            
        // })
    }

    onClubClicked() {
        console.log("click!");
      this.navCtrl.push(ClubDetailsComponent, {club : this.club});
    }
}