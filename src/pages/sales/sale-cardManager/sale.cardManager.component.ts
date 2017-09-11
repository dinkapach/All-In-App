import { ManagerService } from './../../../services/manager.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Sale } from './../../../models/sales.model';
import { EditSaleComponent } from "../edit-sale/edit.sale.component";

@Component({
    selector: 'sale-cardManager',
    templateUrl: 'sale.cardManager.html'
})
export class SaleCardManagerComponent {
    @Input()
    sale: Sale;
    @Output() saleDeleted = new EventEmitter();

    constructor(private navCtrl: NavController, private managerService: ManagerService,
        private alertCtrl: AlertController) {
    }

    onClickEditeSale(sale) {
        this.navCtrl.push(EditSaleComponent, { sale: sale });
    }

    onClickDeleteSale(sale) {
        console.log("in delete sale", sale.id);
        this.managerService.deleteSale(this.sale.id)
            .subscribe(isAuth => {
                console.log("From 'delete-sale.component', print 'isAuth': ", isAuth);
                if (isAuth) {
                    this.saleDeleted.emit(sale);
                }
                else {
                    console.log("unSuccess");
                }
            });
    }
}