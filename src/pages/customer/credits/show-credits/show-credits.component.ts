import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {CreditsCardComponent} from  '../credits-card/credits.card.component';
import 'rxjs/add/operator/map';
import { User } from '../../../../models/user.model';
import { Credit } from '../../../../models/credit.model';
import { UserService } from '../../../../services/user.service';
import { AddCreditComponent } from '../add-credit/add-credit.component';

@Component({
    selector: 'show-credits',
    templateUrl : 'show-credits.html'
})
export class ShowCreditsComponent implements OnInit {
    user: User;
    Credit: Credit;
    updatedUser: any = {};
    @Input()
    creditArr : any
    @Input()
    club : any

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private userService: UserService, private navParams: NavParams, private alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.user = this.userService.getLocalUser();
    }

    handleCreditDeleted(creditToRemove){
        this.creditArr = this.creditArr.filter(credit => {
            return credit.id != creditToRemove.id;
        });
        this.userService.updateLocalCustomerWithoutPromise();
    }

    onClickAddCredit(){
        this.navCtrl.push(AddCreditComponent, {club: this.club});
   }

 }