import { AddSaleComponent } from './../add-sale/add-sale.component';
import { ManagerService } from './../../../services/manager.service';
import { Club } from './../../../models/club.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'show-sales',
    templateUrl : 'show-sales.html'
})
export class ShowSalesComponent {
   club : Club;

    constructor(private fBuilder : FormBuilder,private navCtrl : NavController,
         private navParams: NavParams, 
        private alertCtrl: AlertController, private managerService: ManagerService) {
            this.club = this.managerService.getLocalClub();
        }

    onClickAddSale(){
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