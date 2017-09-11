import { CloneService } from './../../../../helpers/clone-service';
import { SuperManagerService } from './../../../../services/superManager.service';
import { Manager } from './../../../../models/manager.model';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'edit-manager',
    templateUrl: 'edit.manager.html'
})
export class EditManagerComponent {
   manager : Manager;
   editedManager: Manager;

    constructor( private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService, private navParams: NavParams, 
        private cloneService : CloneService) {
        this.manager = this.navParams.get("manager");
        this.editedManager = this.cloneService.getDeepCopyOfManager(this.manager);
        console.log(this.editedManager);
    }

    onClickSave(){
        console.log("edited manager: ",this.editedManager);
        this.superManagerService.updateManager(this.editedManager)
        .subscribe(isUpdated => {
            if(isUpdated){
                alert("manager updated");
            }
            else{
                console.log("manager was not updated");
            }
        })
    }
}