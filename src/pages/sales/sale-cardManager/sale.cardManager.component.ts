import { ManagerService } from './../../../services/manager.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Sale } from './../../../models/sales.model';
import { EditSaleComponent } from "../edit-sale/edit.sale.component";


@Component({
    selector: 'sale-cardManager',
    templateUrl: 'sale.cardManager.html'
})
export class SaleCardManagerComponent  {
    @Input()
    sale: Sale;
    @Output() saleDeleted = new EventEmitter();

    constructor(private navCtrl: NavController,private managerService: ManagerService,
     private alertCtrl: AlertController) {
    }

    editSaleClick(sale){
        this.navCtrl.push(EditSaleComponent, {sale: sale});
    } 

    deleteSaleClick(sale){
            console.log("in delete sale", sale.id);
            this.managerService.deleteSale(this.sale.id)
            .subscribe(isAuth => {
                console.log("From 'delete-sale.component', print 'isAuth': ", isAuth);
                if(isAuth){
                    // alert("sale deleted");
                    this.saleDeleted.emit(sale);
                }
            else{
                // alert("error delete sale");
                console.log("unSuccess");
            }
        });
    }
}
