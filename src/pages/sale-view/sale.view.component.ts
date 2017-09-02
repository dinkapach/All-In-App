//import { ClubDetailsComponent } from './../club-details/club.details.component';
import { Sale } from './../../models/sales.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { ManagerComponent } from '../manager/manager.component';
import { ClubService } from '../../services/club.service';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { EditSaleComponent } from '../edit-sale/edit.sale.component';
import { AddSaleComponent} from '../add-sale/add-sale.component'


@Component({
    selector: 'sale-view',
    templateUrl: 'sale.view.html'
})
export class SaleViewComponent implements OnInit {
    @Input()
    sale: Sale;
 

    constructor(private navCtrl: NavController,private managerService: ManagerService,
    private clubService : ClubService,  private alertCtrl: AlertController,
    private navParams: NavParams,) {
    this.sale = this.navParams.get("sale");

    }

    ngOnInit() {
    }

    // onSaleClicked()
    // {
    //      this.navCtrl.push(AddSaleComponent);
    // }
}
