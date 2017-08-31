import { LoginComponent } from './../login/login.component';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { Credit } from "../../models/credit.model";
import { Club } from '../../models/club.model';

//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'add-credit',
    templateUrl : 'add-credit.html'
})
export class AddCreditComponent{
    user: User;
    formData: FormGroup;
    newCredit: Credit;
    club: Club;

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private userService: UserService, private navParams: NavParams, private alertCtrl: AlertController) {
        this.newCredit = new Credit();
        this.club = this.navParams.get("club");
        this.user = this.userService.getLocalUser();
        this.formData = fBuilder.group({
            'id': ["", Validators.required],
            'dateOfPurchase' : ["", Validators.required],
            'dateOfExpired': ["", Validators.required],
            'items' : ["", Validators.required],
            'totalCredit' : ["", Validators.required]
        })
    }


    onClickAddCredit() {
        // const credit = new Credit();
        // const club = this.navParams.get("club");
        console.log("From 'add-credit.component'. club id:",  this.club.id);
        this.newCredit.clubId = this.club.id;

        this.user.credits.push(this.newCredit);
        this.userService.addCredit(this.newCredit).
        subscribe(isAuth => {
            console.log("From 'add-credit.component', print 'isAuth': ", isAuth);
            if(isAuth){
                let alert = this.alertCtrl.create({
                    subTitle: 'credit added',
                    buttons: ['סבבה']
                });
            alert.present();
            alert.onDidDismiss(() => {
                this.navCtrl.pop();
            });
            }
            else{
                console.log("unSuccess");
            }
        })
    }

    

    

    

}