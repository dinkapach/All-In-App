import { LoginComponent } from './../login/login.component';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Sale } from './../../models/sales.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SaleCardComponent } from '../sale-card/sale.card.component';
import { Club } from '../../models/club.model';
import { AddSaleComponent } from './../add-sale/add-sale.component';
import { SaleCardManagerComponent } from './../sale-cardManager/sale.cardManager.component'
//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'show-sales',
    templateUrl : 'show-sales.html'
})
export class ShowSalesComponent{
   club : Club;
   saleArr : Sale[];

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private userService: UserService, private navParams: NavParams, 
        private alertCtrl: AlertController) {
            this.club = this.navParams.get("club");
            this.saleArr = this.navParams.get("salesByClubArr");
   
        }

        addSale(){
        this.navCtrl.push(AddSaleComponent);
    }
      handleSaleDeleted(saleToRemove){
        this.saleArr = this.saleArr.filter(sale => {
            return sale.id != saleToRemove.id;
        })
    }
}