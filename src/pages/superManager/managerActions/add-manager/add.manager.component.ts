import { SuperManagerService } from './../../../../services/superManager.service';
import { Manager } from './../../../../models/manager.model';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as superManagerConfig from './../../../../../super-manager-config.json';

@Component({
    selector: 'add-manager',
    templateUrl: 'add.manager.html'
})
export class AddManagerComponent {
    formData: FormGroup;
    newManager: Manager;

    constructor(private fBuilder : FormBuilder, private navParams: NavParams,
        private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
        this.initManager();
        this.createFormData();
    }

    createFormData() {
        this.formData = this.fBuilder.group({
            'id': ["", Validators.required],
            'firstName': ["", Validators.required],
            'lastName' : ["", Validators.required],
            'password' : ["", Validators.required],
            'email' : ["", Validators.required]
        });
    }

    // init new manager with the requirs values
    initManager() {
        this.newManager = new Manager();
        this.newManager.clubId;
        this.newManager.permissions = "";
        this.newManager.userName = "";
    }

    // when click add manager, create the manager in the DB
    onClickAddManager() {
        this.superManagerService.createManager(this.newManager)
        .subscribe(isCreated => {
            if(isCreated){
                console.log("manager create succecfully");
            }
            else{
                console.log("cuold not create manager");
            }
        });
    }
}