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
}) // this is the manager component, his home page
export class ManagerComponent {
    manager: Manager;
    club: Club;

    constructor(private managerService: ManagerService, private clubService: ClubService,
        private navCtrl: NavController, public menuCtrl: MenuController) {
        this.manager = this.managerService.getLocalManager();
        this.club = this.managerService.getLocalClub();
    }

    // when the manager choose to add sale, open the relevant component
    addSale() {
        this.navCtrl.push(AddSaleComponent);
    }

    // when the manager choose to edit club, open the relevant component
    onClickEditClub(club) {
        this.navCtrl.push(EditManagerClubComponent);
    }

    // when the manager choose to watch his customers, open the relevant component
    showCustomers() {
        this.navCtrl.push(ShowCustomerComponent);
    }

    // when the manager choose to show his sales, open the relevant component
    showSales() {
        this.navCtrl.push(ShowSalesComponent);
    }

    ionViewWillEnter() {
        this.doUpdate();
    }

    // when the manager logged in, get the updated data 
    doUpdate() {
        this.managerService.updateLocalManager()
            .subscribe(data => {
                this.manager = this.managerService.getLocalManager();
                this.club = this.managerService.getLocalClub();
            });
    }

    // when the manager do refresh (pull down the page), update the local (= current) manager from DB
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.managerService.updateLocalManager()
            .subscribe(isAuth => {
                if (isAuth) {
                    this.manager = this.managerService.getLocalManager();
                    this.club = this.managerService.getLocalClub();
                }
                else {
                    console.log('manager not connected not auth');
                }
            },
            err => {
                console.log(err);
            },
            () => {
                refresher.complete();
            });
    }

    // when the manager choose watch statistics, open the relevant component
    showStatistics() {
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

    // open the settings option (edit profile/change password/ logout)
    onClickSettings() {
        this.navCtrl.push(ManagerSettingsComponent);
    }
}