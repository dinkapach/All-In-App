//import { ClubDetailsComponent } from './../club-details/club.details.component';
import { Sale } from './../../models/sales.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { ManagerComponent } from '../manager/manager.component';
import { ClubService } from '../../services/club.service';
import { NavController, AlertController } from 'ionic-angular';
import { EditSaleComponent } from '../edit-sale/edit.sale.component';
import { AddSaleComponent} from '../add-sale/add-sale.component'
import {SaleViewComponent } from '../sale-view/sale.view.component'

@Component({
    selector: 'sale-card',
    templateUrl: 'sale.card.html'
})
export class SaleCardComponent implements OnInit {
    @Input()
    sale: Sale;
    @Output() saleDeleted = new EventEmitter();

    constructor(private navCtrl: NavController,private managerService: ManagerService,
    private clubService : ClubService,  private alertCtrl: AlertController) {

    }

    ngOnInit() {
    }
}
