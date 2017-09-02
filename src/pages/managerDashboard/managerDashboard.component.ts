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
import 'rxjs/add/operator/map';
import { AddSaleComponent } from './../add-sale/add-sale.component';
import { AddPointsComponent } from './../add-points/add-points.component';
import { SubscirbePointsComponent } from './../subscribe-points/subscribe-points.component';
import { SigningService } from '../../services/signing.service';
import { LoginComponent } from '../login/login.component';
import { ShowSalesComponent } from './../show-sales/show-sales.component';


@Component({
    selector: 'managerDashboard',
    templateUrl: 'managerDashboard.html'
})
export class ManagerDashboardComponent {
    formData : FormGroup;
    manager : Manager;
    club : Club;
    constructor(private fBuilder : FormBuilder, private http: Http, 
    private managerService: ManagerService,private clubService: ClubService, 
    private navCtrl : NavController, private userService: UserService,
    private signService : SigningService ) {
     
    }

      ngOnInit() {
        console.log("getting manager from service:");
        this.manager = this.managerService.getLocalManager();
        this.clubService.getClubByObjectId(this.manager.clubId)
        .subscribe(club=>{
            this.club = club;
            console.log('manager componenet club : ' + this.club);
        })
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
        this.clubService.getClubByObjectId(this.manager.clubId)
         .subscribe(club =>{
             if (club)
             {  
                let salesByClubArr = [];
                this.club.sales.forEach(sale =>{
                    salesByClubArr.push(sale);
                })
                this.navCtrl.push(ShowSalesComponent, {club: club, salesByClubArr: salesByClubArr});
             }
             else{
                  console.log("Error No clubs");
             }

         })
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
}