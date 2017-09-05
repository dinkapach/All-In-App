import { NavController } from 'ionic-angular';
import { ManagerService } from './../../services/manager.service';
import { Club } from './../../models/club.model';
import { ClubService } from './../../services/club.service';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Manager } from './../../models/manager.model';
import { ShowCustomerComponent } from './../show-customer/show-customer.component';
import { ShowStatisticsComponent } from './../show-statistics/show.statistics.component';
import 'rxjs/add/operator/map';
import { AddSaleComponent } from './../add-sale/add-sale.component';
import { SigningService } from '../../services/signing.service';
import { LoginComponent } from '../login/login.component';
import { ShowSalesComponent } from './../show-sales/show-sales.component';
import { EditManagerClubComponent } from '../edit-manager-club/edit-manager-club.component';
import { ManagerSettingsComponent } from '../manager-settings/manager.settings.component';
import { MenuController } from 'ionic-angular';

@Component({
    selector: 'manager',
    templateUrl: 'manager.html'
})
export class ManagerComponent {
    formData : FormGroup;
    manager : Manager;
    club : Club;
    constructor(private fBuilder : FormBuilder, private http: Http, 
    private managerService: ManagerService,private clubService: ClubService, 
    private navCtrl : NavController, private userService: UserService,
    private signService : SigningService, public menuCtrl: MenuController ) {

           console.log("getting manager from service:");
        this.manager = this.managerService.getLocalManager();
        this.club = this.managerService.getLocalClub();
        console.log(this.club);
    }

      ngOnInit() {
    }


    addSale(){
        this.navCtrl.push(AddSaleComponent);
    }

    onClickEditClub(club){
         this.navCtrl.push(EditManagerClubComponent);
    }
    

    showCustomers(){
        this.navCtrl.push(ShowCustomerComponent);
    }

    showSales(){
        this.navCtrl.push(ShowSalesComponent, {club: this.club});
    }

    doUpdate(){
        this.managerService.updateLocalManager()
        .subscribe(data => {
            this.manager = this.managerService.getLocalManager();
            console.log(data);
        });
    }

    doRefresh(refresher){
        console.log('Begin async operation', refresher);
        this.managerService.updateLocalManager()
        .subscribe(isAuth => {
            if (isAuth) {
                alert("manager updated from server");
                this.manager = this.managerService.getLocalManager();
                this.club = this.managerService.getLocalClub();
                // this.refreshClubDispaly()
            }
            else {
                console.log('manager not connected not auth');
                alert("Not Updated");
            }
        },
        err => {
            alert("Connection Error");
            console.log(err);
        },
        () => {
            console.log("yay");
            refresher.complete();
        });
    }

    showStatistics(){
         console.log(this.manager);
          this.clubService.getClubByObjectId(this.manager.clubId)
          .subscribe(club =>{
              if (club)
              {
                  this.navCtrl.push(ShowStatisticsComponent, {club: club});
              }
              else{
                   console.log("Error No clubs");
              }
          })
     }
     onClickSettings(){
          this.navCtrl.push(ManagerSettingsComponent);
     }
}