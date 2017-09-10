import { Club } from './../../../models/club.model';
import { Sale } from './../../../models/sales.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';


@Component({
    selector: 'sale-view',
    templateUrl: 'sale.view.html'
})
export class SaleViewComponent {
    sale: Sale;
    club: Club;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController,
    private navParams: NavParams) {
    this.sale = this.navParams.get("sale");
    this.club = this.navParams.get("club");
    }

}
