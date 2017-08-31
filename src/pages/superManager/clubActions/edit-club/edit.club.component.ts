import { Club } from './../../../../models/club.model';
import { SuperManagerService } from './../../../../services/superManager.service';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EditCreditComponent } from './../edit-credit/edit-credit.component';

@Component({
    selector: 'edit-club',
    templateUrl: 'edit.club.html'
})
export class EditClubComponent implements OnInit {
   club : Club;
   editedClub: Club;

    constructor( private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService, private navParams: NavParams) {
        this.club = this.navParams.get("club");
        this.editedClub = this.DoDeepCopyOfClub(this.club);
        console.log(this.editedClub);
    }

    ngOnInit() {

    }

    DoDeepCopyOfClub(club: Club) {
        let copyOfClub: Club = new Club();
        copyOfClub.id = club.id;
        copyOfClub.name = club.name;
        copyOfClub.address = club.address;
        copyOfClub.openingHours = club.openingHours;
        copyOfClub.phoneNumber = club.phoneNumber;

        return copyOfClub;
    }

    onClickSave(){
        console.log("edited manager: ",this.editedClub);
        this.superManagerService.updateClub(this.editedClub)
        .subscribe(isUpdated => {
            if(isUpdated){
                this.presentAlert();
            }
            else{
                console.log("manager was not updated");
            }
        })
    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            subTitle: 'club edited',
            buttons: ['סבבה']
        });
        alert.present();
        alert.onDidDismiss(() => {
            this.navCtrl.pop();
        });
    }
}