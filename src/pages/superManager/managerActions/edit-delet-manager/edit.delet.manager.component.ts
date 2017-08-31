import { ShowManagerComponent } from './../show-managers/show.managers.component';
import { SuperManagerService } from './../../../../services/superManager.service';
import { Manager } from './../../../../models/manager.model';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'edit-delete-manager',
    templateUrl: 'edit.delet.manager.html'
})
export class EditDeleteManagerComponent implements OnInit{
    managersArr: Manager[];
    searchManager: string;
    tempManagerArr: Manager[];

    constructor(private fBuilder : FormBuilder, private navParams: NavParams,
        private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
         this.initManagersArr();
    }

    ngOnInit() {
    }

    initManagersArr(){
        this.managersArr = [];
        this.superManagerService.getManagersArr()
        .subscribe(result => {
            console.log("result from inint managersArr", result);
            if(result.isAuth){
                this.managersArr = result.managerArr;
                this.tempManagerArr = this.doDeepCopyOfArr(this.managersArr);
            }
            else {
                console.log("super manager error in get manager arr");
            }
        })

    }

    handleManagerDeleted(managerToRemove){
        this.managersArr = this.managersArr.filter(currManager => {
            return currManager.id != managerToRemove.id;
        })
    }

    searchManagers  () {
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