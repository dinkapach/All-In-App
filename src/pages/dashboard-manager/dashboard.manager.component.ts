import { ClubDetailsComponent } from './../clubs/club-details/club.details.component';
import { ClubsListComponent } from './../clubs/clubs-list/clubs.list.component';
import { Club } from './../../models/club.model';
import { ClubService } from './../../services/club.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Component , OnInit } from '@angular/core';
import { NavParams, LoadingController, ModalController, NavController } from 'ionic-angular';

import 'rxjs/add/operator/map';

@Component({
    selector : 'dashboard-manager',
    templateUrl : 'dashboard.manager.html'
})
export class DashboardManagerComponent implements OnInit {
    user : User;
    clubsDisplay : Club[];
    searchClub: string;
    grid: Array<Array<Club>>;

    constructor(private navParams : NavParams, private userService : UserService, 
    private clubService : ClubService, private loader : LoadingController,
    private modalCtrl: ModalController, private navCtrl : NavController) { 
        this.grid = new Array<Array<Club>>();
        this.searchClub = '';
        // this.clubsDisplay = this.user.Clubs;
    }

    ngOnInit() {
        this.user = this.userService.getLocalUser();
        this.initGrid();
    }

    private initGrid(){
        const size = Math.ceil(this.user.clubs.length / 2);
        var j = 0;
        for (var i = 0; i < size; i++) {
            this.grid[i] = new Array<Club>();
            if ( size > 1 && i != size-1) {
                for ( j = 0; j < 2; j++) {
                    this.grid[i][j] = this.user.clubs[i * 2 + j];
                }
            }
            if(i == size-1 && size % 2 == 0){
                this.grid[i][j] = this.user.clubs[i * 2 + j];                            
            }
        }
    }

    onClickPresentClubs() {
        let clubsModal = this.modalCtrl.create(ClubsListComponent);
         clubsModal.onDidDismiss(clubChosen => {
            if(clubChosen) {
            this.user.clubs.push(clubChosen);
            // this.userService.updateUser(this.user)
            // .subscribe(isUpdated => {
            //     if(isUpdated) {
            //         console.log("updated");
            //         this.clubsDisplay.push(clubChosen);
            //     }
            //     else {
            //         console.log("not updated");
            //     }
            // })
        }
        });
        clubsModal.present();
    }

    searchClubs() {
        this.clubsDisplay = this.user.clubs;
        this.clubsDisplay = this.clubsDisplay.filter(club => {
                return club.name.toLowerCase().startsWith(this.searchClub); 
        });
    }
}