import { SuperManagerService } from './../../../../services/superManager.service';
import { Manager } from './../../../../models/manager.model';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as superManagerConfig from './../../../../../super-manager-config.json';

@Component({
    selector: 'add-club-to-manager',
    templateUrl: 'add.club.to.manager.html'
})
export class AddClubToManagerComponent {
    managerId: number;
    clubId: string;

    constructor(private fBuilder : FormBuilder, private navParams: NavParams,
        private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
    }

    onClickAddExistingClubToManager() {
        this.superManagerService.addExistingClubToManager(this.managerId, this.clubId)
        .subscribe(isAuth => {
            if(isAuth){
                alert("club added to manager");
            }
            else {
                console.log("club not added to manager");
            }
        })
    }
}