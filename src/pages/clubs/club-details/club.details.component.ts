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
import { ShowCreditsComponent } from '../../show-credits/show-credits.component';
import { SaleViewComponent } from '../../sale-view/sale.view.component';
import { Sale } from '../../../models/sales.model';

@Component({
    selector: 'club-details',
    templateUrl: 'club.details.html'
})
export class ClubDetailsComponent extends ClubDetailsBaseComponent implements OnInit {


    constructor(public navParams: NavParams,
        public navCtrl: NavController, public userService: UserService,
        public clubService: ClubService, public alertCtrl: AlertController) {
        super(navParams, navCtrl, userService, clubService, alertCtrl);
        this.viewOptions = 'sales'
    }

    ngOnInit() {
        // this.club = this.navParams.get("club");
    }

    onSaleClicked(sale: Sale){
        console.log("new");
         this.navCtrl.push(SaleViewComponent, {sale: sale, club: this.club});
    }
}