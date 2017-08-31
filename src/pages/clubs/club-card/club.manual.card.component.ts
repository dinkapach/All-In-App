import { ClubManualDetailsComponent } from './../club-details/club.manual.details.component';
import { EditClubManuallyComponent } from './../manualClubs/club-manual-edit/club.manual.edit.component';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { ClubManually } from './../../../models/clubManually.model';
import { NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'club-manual-card',
    templateUrl: 'club.card.html'
})
export class ClubManualCardComponent implements OnInit {
    user: User;
    @Input()
    club: ClubManually;
    @Input()
    subDetailsToPresent: string;
    @Output() clubDeleted = new EventEmitter();

    constructor(private navCtrl: NavController, private userService: UserService,
        private alertCtrl: AlertController) {
            this.user = this.userService.getLocalUser();
    }

    ngOnInit() {
    }

    onClubClicked(){
        this.navCtrl.push(ClubManualDetailsComponent, {club: this.club})
    }

    onClickEditClub(club){
        this.navCtrl.push(EditClubManuallyComponent, {club: club});
    }

    onClickDeleteClub(clubToDelete){
        this.user.manuallyClubs = this.user.manuallyClubs.filter(club => { return club.id != clubToDelete.id})
        this.userService.updateUser(this.user).
        subscribe(isAuth => {
            if(isAuth){
                let alert = this.alertCtrl.create({
                    subTitle: 'club deleted',
                    buttons: ['סבבה']
                });
            alert.present();
            // alert.onDidDismiss(() => {
            //     this.navCtrl.pop();
            // });
            this.clubDeleted.emit(clubToDelete);
            }
            else{
                console.log("unSuccess");
            }
        })
    }
}