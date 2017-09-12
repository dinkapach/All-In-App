import { Club } from './../../../models/club.model';
import { Sale } from './../../../models/sales.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

@Component({
    selector: 'sale-view',
    templateUrl: 'sale.view.html'
}) // this component present the sale details when click on sale card
export class SaleViewComponent {
    sale: Sale;
    club: Club;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController,
    private navParams: NavParams) {
        // get the parametrs to present
    this.sale = this.navParams.get("sale");
    this.club = this.navParams.get("club");
    }
}