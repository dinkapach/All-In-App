import { EditClubComponent } from './../edit-club/edit.club.component';
import { Club } from './../../../../models/club.model';
import { SuperManagerService } from './../../../../services/superManager.service';
import { NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'club-card-super',
    templateUrl: 'club.card.super.html'
})
export class ClubCardSuperComponent implements OnInit {
    @Input()
    club : Club;
   @Output() clubDeleted = new EventEmitter();

    constructor( private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
    }

    ngOnInit() {

    }

    editClubClick(club){
        this.navCtrl.push(EditClubComponent, {club: club});
    }

    deleteClubClick(club) {
        let confirm = this.alertCtrl.create({
            title: 'Do you want to remove the club form manager?',
            message: '',
            buttons: [
              {
                text: 'No',
                handler: () => { this.deleteClub(club) }
              }, {
                text: 'Yes',
                handler: () => { this.deleteClubAndRemoveFromManager(club)}
              }
            ]
          });
        confirm.present();       
    }

    deleteClubAndRemoveFromManager(club) {
        let prompt = this.alertCtrl.create({
            title: 'Remove club from manager',
            message: "Enter Manager ID",
            inputs: [
              {
                name: 'managerId',
                placeholder: 'manager Id'
              },
            ],
            buttons: [
              {
                text: 'Save',
                handler: data => {
                  console.log('Saved clicked', data.managerId);
                  this.deleteClubFromDBAndRemoveFromManager(data.managerId, club)
                }
              }
            ]
          });
          prompt.present();
    }

    deleteClub(club){
        this.superManagerService.deleteClub(club).
        subscribe(isAuth => {
            console.log("From 'delete-manager', print 'isAuth': ", isAuth);
            if(isAuth) {
            this.presentAlert();
            this.clubDeleted.emit(club);
            }
            else{
                console.log("unSuccess");
            }
        });
    }

    deleteClubFromDBAndRemoveFromManager(managerId, club) { 
        this.superManagerService.deleteClubFromDBAndRemoveFromManager(managerId, club).
        subscribe(isAuth => {
            console.log("From 'delete-manager', print 'isAuth': ", isAuth);
            if(isAuth) {
            this.presentAlert();
            this.clubDeleted.emit(club);
            }
            else{
                console.log("unSuccess");
            }
        });
    }


    presentAlert() {
        let alert = this.alertCtrl.create({
            subTitle: 'club deleted',
            buttons: ['סבבה']
        });
        alert.present();
        alert.onDidDismiss(() => {
            this.navCtrl.pop();
        });
    }


}