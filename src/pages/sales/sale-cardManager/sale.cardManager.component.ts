import { ManagerService } from './../../../services/manager.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Sale } from './../../../models/sales.model';
import { EditSaleComponent } from "../edit-sale/edit.sale.component";

@Component({
    selector: 'sale-cardManager',
    templateUrl: 'sale.cardManager.html'
}) // this component is sale card for manager, manager heve more options on his sales, like edit or delete sale
export class SaleCardManagerComponent {
    @Input()
    sale: Sale;
    @Output() saleDeleted = new EventEmitter();

    constructor(private navCtrl: NavController, private managerService: ManagerService,
        private alertCtrl: AlertController) {
    }

    // when click on edit sale, open the 'edit sale' component
    onClickEditeSale(sale) {
        this.navCtrl.push(EditSaleComponent, { sale: sale });
    }

    // when click delete sale, delete sale from DB
    onClickDeleteSale(sale) {
        this.managerService.deleteSale(this.sale.id)
            .subscribe(isAuth => {
                if (isAuth) {
                    this.saleDeleted.emit(sale);
                }
                else {
                    console.log("unSuccess");
                }
            });
    }
}