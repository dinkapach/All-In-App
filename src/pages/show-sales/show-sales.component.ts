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
import { ManagerService } from '../../services/manager.service';
//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'show-sales',
    templateUrl : 'show-sales.html'
})
export class ShowSalesComponent{
   club : Club;
//    saleArr : Sale[];

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private userService: UserService, private navParams: NavParams, 
        private alertCtrl: AlertController, private managerService: ManagerService) {
            this.club = this.managerService.getLocalClub();
            // this.saleArr = this.club.sales;
            // console.log(this.saleArr);
        }

    addSale(){
        this.navCtrl.push(AddSaleComponent);
    }

    ionViewWillEnter(){
        console.log("enter page");
        this.managerService.updateLocalManager()
        .subscribe(updated =>{
            if(updated){
                this.fetchDataFromService();
            }
        });
    }

    fetchDataFromService(){
        this.club = this.managerService.getLocalClub();
        console.log("updated club: ", this.club);
    }

    handleSaleDeleted(saleToRemove){
        console.log("delete sale emmited");
        this.club.sales = this.club.sales.filter(sale => {
            return sale.id != saleToRemove.id;
        })
    }
}