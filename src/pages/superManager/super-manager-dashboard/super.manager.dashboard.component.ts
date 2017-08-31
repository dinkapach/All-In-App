import { DeleteCustomerComponent } from './../customerActions/delete-customer/delete.customer.component';
import { EditDeleteClubComponent } from './../clubActions/edit-delete-club/edit.delete.club.component';
import { AddClubComponent } from './../clubActions/add-club/add.club.component';
import { AddClubToManagerComponent } from './../managerActions/add-club-to-manager/add.club.to.manager.component';
import { EditDeleteManagerComponent } from './../managerActions/edit-delet-manager/edit.delet.manager.component';
import { AddManagerComponent } from './../managerActions/add-manager/add.manager.component';
import { ClubActionComponent } from './../clubActions/super-manager-club-actions/super.manager.club.actions.component';
import { ManagerActionComponent } from './../managerActions/super-manager-manager-actions/super.manager.manager.actions.component';
import { SuperManager } from './../../../models/superManager.model';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';

import * as superManagerConfig from './../../../../super-manager-config.json';

@Component({
    selector: 'super-manager-dashboard',
    templateUrl: 'super.manager.dashboard.html'
})
export class SuperManagerDashboardComponent implements OnInit{
    superManager: SuperManager;
    viewOptions: string;
    clubActions: string[];
    managerActions: string[];
    customerActions: string[];

    constructor(public navParams: NavParams,
        public navCtrl: NavController, public alertCtrl: AlertController) {
        this.superManager = this.navParams.get("superManager");
    }

    ngOnInit() {
        this.clubActions = superManagerConfig.CLUB_ACTIONS;
        this.managerActions = superManagerConfig.MANAGER_ACTIONS;
        this.customerActions = superManagerConfig.CUSTOMER_ACTIONS;
     }

     onClickManagerAction(action){
         switch(action){
            case superManagerConfig.MANAGER_ACTIONS[0]:
                this.navCtrl.push(AddManagerComponent);
                break;
            case superManagerConfig.MANAGER_ACTIONS[1]:
                this.navCtrl.push(EditDeleteManagerComponent);
                break;
            case superManagerConfig.MANAGER_ACTIONS[2]:
                this.navCtrl.push(AddClubToManagerComponent);
                break;
         }
     }

     onClickCustomerAction(action){
        switch(action){
            case superManagerConfig.CUSTOMER_ACTIONS[0]:
                this.navCtrl.push(DeleteCustomerComponent);
                break;
         }
    }

     onClickClubAction(action){
        //this.navCtrl.push(ClubActionComponent, {action: action});
        switch(action){
            case superManagerConfig.CLUB_ACTIONS[0]:
                this.navCtrl.push(AddClubComponent);
                break;
            case superManagerConfig.CLUB_ACTIONS[1]:
                this.navCtrl.push(EditDeleteClubComponent);
                break;
         }
     }

}