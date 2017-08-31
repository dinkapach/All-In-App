import { Club } from './../../../../models/club.model';
import { SuperManagerService } from './../../../../services/superManager.service';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'add-club',
    templateUrl: 'add.club.html'
})
export class AddClubComponent implements OnInit{
    formData: FormGroup;
    isAddClub: boolean;
    newClub: Club;
    managerId: number;

    constructor(private fBuilder : FormBuilder, private navParams: NavParams,
        private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
        this.initClub();
        this.formData = fBuilder.group({
            'managerId':["", Validators.required],
            'id': ["", Validators.required],
            'name' : ["", Validators.required],
            'address': ["", Validators.required],
            'phoneNumber' : ["", Validators.required],
            'openingHour' : "",
            'closingHour' : ""
        })
    }

    ngOnInit() {
    }

    initClub(){
        this.newClub = new Club();
        this.newClub.openingHours = [new Date() , new Date()];
        this.newClub.isManual = false;
        this.newClub.branches = [];
        this.newClub.sales = [];
        this.newClub.usersClub = [];
        this.newClub.img = "";
    }

    onClickAddClub() {
        console.log("from add club");
        console.log("newClub: ", this.newClub);

        this.superManagerService.createClubAndAddToManager(this.newClub, this.managerId)
        .subscribe(isCreated => {
            if(isCreated){
                console.log("club create succecfully");
                this.presentAlert();
            }
            else{
                console.log("cuold not create manager");
            }
        });
    }


    presentAlert(){
        let alert = this.alertCtrl.create({
            subTitle: 'club added',
            buttons: ['סבבה']
        });
        alert.present();
        alert.onDidDismiss(() => {
            this.navCtrl.pop();
        });
    }

}