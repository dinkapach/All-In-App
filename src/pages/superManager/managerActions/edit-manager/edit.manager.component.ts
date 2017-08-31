import { SuperManagerService } from './../../../../services/superManager.service';
import { Manager } from './../../../../models/manager.model';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EditCreditComponent } from './../edit-credit/edit-credit.component';

@Component({
    selector: 'edit-manager',
    templateUrl: 'edit.manager.html'
})
export class EditManagerComponent implements OnInit {
   manager : Manager;
   editedManager: Manager;

    constructor( private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService, private navParams: NavParams) {
        this.manager = this.navParams.get("manager");
        this.editedManager = this.DoDeepCopyOfManager(this.manager);
        console.log(this.editedManager);
    }

    ngOnInit() {

    }

    DoDeepCopyOfManager(manager: Manager) {
        let copyOfManager: Manager = new Manager();
        copyOfManager.id = manager.id;
        copyOfManager.clubId = manager.clubId;
        copyOfManager.firstName = manager.firstName;
        copyOfManager.lastName = manager.lastName;
        copyOfManager.email = manager.email;
        copyOfManager.permissions = manager.permissions;
        copyOfManager.password = manager.password;
        copyOfManager.userName = manager.userName;

        return copyOfManager;
    }

    onClickSave(){
        console.log("edited manager: ",this.editedManager);
        this.superManagerService.updateManager(this.editedManager)
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
            subTitle: 'manager edited',
            buttons: ['סבבה']
        });
        alert.present();
        alert.onDidDismiss(() => {
            this.navCtrl.pop();
        });
    }
}