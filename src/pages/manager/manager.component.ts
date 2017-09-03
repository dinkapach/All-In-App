//import { DashboardComponent } from './../dashboard/dashboard.component';
//import { SignupComponent } from './../signup/signup.component';
import { NavController } from 'ionic-angular';
//import { ClubDetailsComponent } from './../clubs/club-details/club.details.component';
import { ManagerService } from './../../services/manager.service';
import { Sale } from './../../models/sales.model';
import { Club } from './../../models/club.model';
import { ClubService } from './../../services/club.service';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Manager } from './../../models/manager.model';
import { ShowCustomerComponent } from './../show-customer/show-customer.component';
import { ShowStatisticsComponent } from './../show-statistics/show-statistics.component';
import 'rxjs/add/operator/map';
import { AddSaleComponent } from './../add-sale/add-sale.component';
import { AddPointsComponent } from './../add-points/add-points.component';
import { SubscirbePointsComponent } from './../subscribe-points/subscribe-points.component';
import { SigningService } from '../../services/signing.service';
import { LoginComponent } from '../login/login.component';
import { ShowSalesComponent } from './../show-sales/show-sales.component';



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
    private signService : SigningService ) {

           console.log("getting manager from service:");
        this.manager = this.managerService.getLocalManager();
        this.club = this.managerService.getLocalClub();
    }

      ngOnInit() {
    }

    addSale(){
        this.navCtrl.push(AddSaleComponent);
    }

    showCustomers(){
        console.log(this.manager);
         this.clubService.getClubByObjectId(this.manager.clubId)
         .subscribe(club =>{
             if (club)
             {
                  this.navCtrl.push(ShowCustomerComponent, {club: club});
             }
             else{
                  console.log("Error No clubs");
             }

         })
 
    }

    showSales(){
        this.navCtrl.push(ShowSalesComponent, {club: this.club});
    }
    
    addPointsToCustomerById()
    {
        this.navCtrl.push(AddPointsComponent);
  
    }
    subscribePointsToCustomerById()
    {
         this.navCtrl.push(SubscirbePointsComponent);
    }
    onClickLogout()
    {  
        this.signService.logoutUser().subscribe(isAuth => {
            this.navCtrl.setRoot(LoginComponent);
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
}