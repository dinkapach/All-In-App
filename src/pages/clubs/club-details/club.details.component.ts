import { Sale } from './../../../models/sales.model';
import { SaleViewComponent } from './../../sales/sale-view/sale.view.component';
import { ClubDetailsBaseComponent } from './club.details.base.component';
import { ScanReceiptComponent } from './../../receipts/receipt-scan/receipt.scan.component';
import { ClubService } from './../../../services/club.service';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user.model';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Club } from './../../../models/club.model';
import { Component, Input, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AddCreditComponent } from '../../add-credit/add-credit.component';

@Component({
    selector: 'club-details',
    templateUrl: 'club.details.html'
})
export class ClubDetailsComponent extends ClubDetailsBaseComponent {

    constructor(public navParams: NavParams,
        public navCtrl: NavController, public userService: UserService,
        public clubService: ClubService, public alertCtrl: AlertController) {
        super(navParams, navCtrl, userService, clubService, alertCtrl);
        // in case the club is manual, the defult view is sales
        this.viewOptions = 'sales'
    }
    
    onSaleClicked(sale: Sale) {
        this.navCtrl.push(SaleViewComponent, { sale: sale, club: this.club });
    }
}