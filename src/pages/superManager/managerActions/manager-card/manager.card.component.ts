import { EditManagerComponent } from './../edit-manager/edit.manager.component';
import { SuperManagerService } from './../../../../services/superManager.service';
import { Manager } from './../../../../models/manager.model';
import { NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EditCreditComponent } from './../edit-credit/edit-credit.component';

@Component({
    selector: 'manager-card',
    templateUrl: 'manager.card.html'
})
export class ManagerCardComponent implements OnInit {
    @Input()
   manager : Manager;
   @Output() managerDeleted = new EventEmitter();

    constructor( private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
    }

    ngOnInit() {

    }

    editManagerClick(manager){
        this.navCtrl.push(EditManagerComponent, {manager: manager});
    }

    deleteManagerClick(manager) {
        let confirm = this.alertCtrl.create({
            title: 'Do you want to move the club for another managment? ',
            message: '',
            buttons: [
              {
                text: 'No, delete club',
                handler: () => { this.deleteManagerWithClub(manager) }
              }, {
                text: 'No, But keep club',
                handler: () => { this.deleteManagerWithoutClub(manager) }
              }, {
                text: 'Yes',
                handler: () => { this.deleteManagerAndReplaceManagemant(manager)}
              }
            ]
          });
        confirm.present();       
    }

    deleteManagerAndReplaceManagemant(manager) {
        let prompt = this.alertCtrl.create({
            title: 'Replace Managment',
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
                  this.replaceManaerForClubAndDeleteManager(data.managerId, manager)
                }
              }
            ]
          });
          prompt.present();
    }

    deleteManagerWithoutClub(manager){
        this.superManagerService.deleteManagerWithoutClub(manager.id).
        subscribe(isAuth => {
            console.log("From 'delete-manager', print 'isAuth': ", isAuth);
            if(isAuth) {
            this.presentAlert();
            this.managerDeleted.emit(manager);
            }
            else{
                console.log("unSuccess");
            }
        });
    }

    replaceManaerForClubAndDeleteManager(newManagerOfClubId, managerToRemove) {
        this.superManagerService.replaceManaerForClubAndDeleteManager(newManagerOfClubId, managerToRemove.id, managerToRemove.clubId)
        .subscribe(isAuth => {
            console.log("From 'delete-manager', print 'isAuth': ", isAuth);
            if(isAuth) {
                this.presentAlert();
                this.managerDeleted.emit(managerToRemove);
            }
            else{
                console.log("unSuccess");
            }
        });
    }

    deleteManagerWithClub(manager) {
        this.superManagerService.deleteManagerWithClub(manager.id, manager.clubId).
        subscribe(isAuth => {
            console.log("From 'delete-manager', print 'isAuth': ", isAuth);
            if(isAuth) {
            this.presentAlert();
            this.managerDeleted.emit(manager);
            }
            else{
                console.log("unSuccess");
            }
        });
    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            subTitle: 'manager deleted',
            buttons: ['סבבה']
        });
        alert.present();
        alert.onDidDismiss(() => {
            this.navCtrl.pop();
        });
    }


}