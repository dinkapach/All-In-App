import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Sale } from './../../../models/sales.model';

@Component({
    selector: 'sale-card',
    templateUrl: 'sale.card.html'
}) // this component is the sale card that 'show sale' component call in the HTML tags 
export class SaleCardComponent {
    @Input()
    sale: Sale;
    @Output() saleDeleted = new EventEmitter();

    constructor(private navCtrl: NavController,  private alertCtrl: AlertController) {
    }
}
