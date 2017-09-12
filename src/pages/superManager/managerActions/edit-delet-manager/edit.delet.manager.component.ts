import { ShowManagerComponent } from './../show-managers/show.managers.component';
import { SuperManagerService } from './../../../../services/superManager.service';
import { Manager } from './../../../../models/manager.model';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'edit-delete-manager',
    templateUrl: 'edit.delet.manager.html'
}) // when the super manager choose to edit or delete manager, he gets this component
// this component present him all managers in our DB (by the tag <manager-card></manager-card> in the HTML)
// the super manager can choose manager to edit or delete (by clicking the right button)
export class EditDeleteManagerComponent {
    managersArr: Manager[];
    searchManager: string;
    tempManagerArr: Manager[];

    constructor(private fBuilder: FormBuilder, private navParams: NavParams,
        private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
        this.initManagersArr();
    }

    // init the managers array to present, get all managers from DB
    initManagersArr() {
        this.managersArr = [];
        this.superManagerService.getManagersArr()
            .subscribe(result => {
                if (result.isAuth) {
                    this.managersArr = result.managerArr;
                    this.tempManagerArr = this.doDeepCopyOfArr(this.managersArr);
                }
                else {
                    console.log("super manager error in get manager arr");
                }
            })
    }

    // in case super manager deleted manager, the relevant component emit that the manager delted
    // so we can remove this manager form display
    handleManagerDeleted(managerToRemove) {
        this.managersArr = this.managersArr.filter(currManager => {
            return currManager.id != managerToRemove.id;
        })
    }

    // serach for manager in the search bar
    searchManagers() {
        this.managersArr = this.tempManagerArr.filter(manager => {
            return manager.id.toString().startsWith(this.searchManager);
        });
    }

    doDeepCopyOfArr(arrToCopy) {
        let copiedArr = [];
        arrToCopy.forEach(element => {
            copiedArr.push(element);
        });
        return copiedArr;
    }
}