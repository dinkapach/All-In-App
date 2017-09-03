//import { ClubDetailsComponent } from './../club-details/club.details.component';
import { Sale } from './../../models/sales.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { ManagerComponent } from '../manager/manager.component';
import { ClubService } from '../../services/club.service';
import { NavController, AlertController } from 'ionic-angular';
import { EditSaleComponent } from '../edit-sale/edit.sale.component';


@Component({
    selector: 'sale-cardManager',
    templateUrl: 'sale.cardManager.html'
})
export class SaleCardManagerComponent implements OnInit {
    @Input()
    sale: Sale;
    @Output() saleDeleted = new EventEmitter();

    constructor(private navCtrl: NavController,private managerService: ManagerService,
    private clubService : ClubService,  private alertCtrl: AlertController) {
    }

    ngOnInit() {
    }

    editSaleClick(sale){
        this.navCtrl.push(EditSaleComponent, {sale: sale});
    } 

    deleteSaleClick(sale){
            console.log("in delete sale");
            this.managerService.deleteSale(this.sale.id)
            .subscribe(isAuth => {
                console.log("From 'delete-sale.component', print 'isAuth': ", isAuth);
                if(isAuth){
                    alert("sale deleted");
                    this.saleDeleted.emit(sale);
                }
            else{
                alert("error delete sale");
                console.log("unSuccess");
            }
        });
    }
}
