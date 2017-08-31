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
export class AddManagerComponent implements OnInit{
    formData: FormGroup;
    newManager: Manager;

    constructor(private fBuilder : FormBuilder, private navParams: NavParams,
        private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
        this.initManager();
        this.createFormData();
    }

    ngOnInit() {
    }

    createFormData() {
        this.formData = this.fBuilder.group({
            'id': ["", Validators.required],
            'userName' : ["", Validators.required],
            'firstName': ["", Validators.required],
            'lastName' : ["", Validators.required],
            'password' : ["", Validators.required],
            'email' : ["", Validators.required]
        })
    }

    initManager() {
        this.newManager = new Manager();
        this.newManager.clubId = null;
        this.newManager.permissions = "";
    }

    onClickAddManager() {
        console.log("from click add manager");
        console.log("newManager: ", this.newManager);

        this.superManagerService.createManager(this.newManager)
        .subscribe(isCreated => {
            if(isCreated){
                console.log("manager create succecfully");
                this.presentAlert();
            }
            else{
                console.log("cuold not create manager");
            }
        });
    }

    presentAlert(){
        let alert = this.alertCtrl.create({
            subTitle: 'Manager Added',
            buttons: ['סבבה']
        });
        alert.present();
        alert.onDidDismiss(() => {
            this.navCtrl.pop();
        });
    }
}