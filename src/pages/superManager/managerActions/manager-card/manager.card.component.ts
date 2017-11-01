import { EditManagerComponent } from './../../../managers/edit-profile-manager/edit.manager.component';
import { SuperManagerService } from './../../../../services/superManager.service';
import { Manager } from './../../../../models/manager.model';
import { NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'manager-card',
    templateUrl: 'manager.card.html'
}) // the manager card component, present manager for component that call this in the HTML
// with the tag <manager-card></manager-card>
export class ManagerCardComponent {
    @Input()
    manager: Manager;
    @Output() managerDeleted = new EventEmitter();

    constructor(private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
    }

    // when choose to edit manager, open the relevent component
    editManagerClick(manager) {
        this.navCtrl.push(EditManagerComponent, { manager: manager });
    }

    // when click delete manager, check if the manager wants to replace the managment of his club 
    // for anothe manager, or not with option to delete the club if not.
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
                    handler: () => { this.deleteManagerAndReplaceManagemant(manager) }
                }
            ]
        });
        confirm.present();
    }

    // this fucntion delete manager and replace his mangment with another manager
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
                        this.replaceManaerForClubAndDeleteManager(data.managerId, manager)
                    }
                }
            ]
        });
        prompt.present();
    }

    // this function delete manager, and keep the club
    deleteManagerWithoutClub(manager) {
        this.superManagerService.deleteManagerWithoutClub(manager.id).
            subscribe(isAuth => {
                if (isAuth) {
                    this.managerDeleted.emit(manager);
                }
                else {
                    console.log("unSuccess");
                }
            });
    }

    // this function replace the managment of the club for another manager
    replaceManaerForClubAndDeleteManager(newManagerOfClubId, managerToRemove) {
        this.superManagerService.replaceManaerForClubAndDeleteManager(newManagerOfClubId, managerToRemove.id, managerToRemove.clubId)
            .subscribe(isAuth => {
                if (isAuth) {
                    this.managerDeleted.emit(managerToRemove);
                }
                else {
                    console.log("unSuccess");
                }
            });
    }

    // this function delete the manager and his club
    deleteManagerWithClub(manager) {
        this.superManagerService.deleteManagerWithClub(manager.id, manager.clubId).
            subscribe(isAuth => {
                if (isAuth) {
                    alert("manager deleted");
                    this.managerDeleted.emit(manager);
                }
                else {
                    console.log("unSuccess");
                }
            });
    }
}