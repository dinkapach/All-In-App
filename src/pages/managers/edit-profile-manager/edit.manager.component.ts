import { EditProfileManagerBaseComponent } from './edit.profile.manager.base.component';
import { FormBuilder } from '@angular/forms';
import { CloneService } from './../../../helpers/clone-service';
import { SuperManagerService } from './../../../services/superManager.service';
import { Manager } from './../../../models/manager.model';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'edit-manager',
    templateUrl: 'edit.profile.manager.base.html'
})
export class EditManagerComponent extends EditProfileManagerBaseComponent {

    constructor(public navCtrl: NavController, public superManagerService: SuperManagerService, public fBuilder : FormBuilder, 
        public navParams: NavParams, public cloneService : CloneService) {
            super(fBuilder, cloneService, navParams.get("manager"));
    }

    // when click on update info, update in DB also
    onClickUpdateInfo() {
        this.superManagerService.updateManager(this.updatedManager)
        .subscribe(isAuth => {
            if(isAuth){
                this.loadFormValuesFromUpdatedManagerToManager();
                alert("Profile Updated");
                this.navCtrl.pop();
            }
            else{
                alert("Updated failed");
            }
        })
    }
}