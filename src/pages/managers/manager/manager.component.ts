import { ManagerSettingsComponent } from './../../managers/manager-settings/manager.settings.component';
import { ShowStatisticsComponent } from './../../managers/show-statistics/show.statistics.component';
import { ShowSalesComponent } from './../../sales/show-sales/show-sales.component';
import { ShowCustomerComponent } from './../../managers/show-customer/show-customer.component';
import { EditManagerClubComponent } from './../../clubs/edit-club/edit.manager.club.component';
import { AddSaleComponent } from './../../sales/add-sale/add-sale.component';
import { ClubService } from './../../../services/club.service';
import { ManagerService } from './../../../services/manager.service';
import { Club } from './../../../models/club.model';
import { Manager } from './../../../models/manager.model';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { MenuController, NavController } from 'ionic-angular';

@Component({
    selector: 'manager',
    templateUrl: 'manager.html'
})
export class ManagerComponent {
    manager: Manager;
    club: Club;

    constructor(private managerService: ManagerService, private clubService: ClubService,
        private navCtrl: NavController, public menuCtrl: MenuController) {
        console.log("getting manager from service:");
        this.manager = this.managerService.getLocalManager();
        this.club = this.managerService.getLocalClub();
        console.log(this.club);
    }


    addSale() {
        this.navCtrl.push(AddSaleComponent);
    }

    onClickEditClub(club) {
        this.navCtrl.push(EditManagerClubComponent);
    }


    showCustomers() {
        this.navCtrl.push(ShowCustomerComponent);
    }

    showSales() {
        this.navCtrl.push(ShowSalesComponent);
    }

    ionViewWillEnter() {
        this.doUpdate();
    }

    doUpdate() {
        this.managerService.updateLocalManager()
            .subscribe(data => {
                this.manager = this.managerService.getLocalManager();
                this.club = this.managerService.getLocalClub();
                console.log(data);
            });
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.managerService.updateLocalManager()
            .subscribe(isAuth => {
                if (isAuth) {
                    // alert("manager updated from server");
                    this.manager = this.managerService.getLocalManager();
                    this.club = this.managerService.getLocalClub();
                    // this.refreshClubDispaly()
                }
                else {
                    console.log('manager not connected not auth');
                    // alert("Not Updated");
                }
            },
            err => {
                // alert("Connection Error");
                console.log(err);
            },
            () => {
                console.log("yay");
                refresher.complete();
            });
    }

    showStatistics() {
        console.log(this.manager);
        this.clubService.getClubByObjectId(this.manager.clubId)
            .subscribe(club => {
                if (club) {
                    this.navCtrl.push(ShowStatisticsComponent, { club: club });
                }
                else {
                    console.log("Error No clubs");
                }
            })
    }
    onClickSettings() {
        this.navCtrl.push(ManagerSettingsComponent);
    }
}