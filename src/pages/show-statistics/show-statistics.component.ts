import { UserClub } from './../../models/userClub.model';
import { Club } from './../../models/club.model';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';

import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {UserCardComponent} from  '../user-card/usercard.component';

// import {ManagerRepository} from '../.././database/repositories/manager.repository';
import 'rxjs/add/operator/map';
import { ClubCardComponent } from '../clubs/club-card/club.card.component';
import { Credit } from '../../models/credit.model';

import { Sale } from './../../models/sales.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../services/user.service';
import { ManagerComponent } from '../manager/manager.component';
import { ManagerService } from '../../services/manager.service';


//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'show-statistics',
    templateUrl : 'show-statistics.html'
})
export class ShowStatisticsComponent{
    club: Club;
    userCard: UserClub;
    customerDisplay: UserClub[];
    searchCustomer: string;
      constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private userService: UserService, private navParams: NavParams,
        private alertCtrl: AlertController, private managerService: ManagerService) {
          
          this.club = this.navParams.get("club");
          this.getUsersClubAges();
        }

        getUsersClubAges(){
          var childs = 0;
          var teenagers = 0;
          var olds = 0;


 
        this.managerService.getCustomersArr(this.club.id)
        .subscribe(customers => {
           customers.forEach(customer => {
             var age = this.calculateAge(customer.birthDate);
             if (age < 20){
               childs;
             }
             else if( age < 30){
               teenagers;
             }
             else{
               olds;
             }
           });

           console.log("childs: " + childs);
           console.log("teens: " + teenagers);
           console.log("olds: " + olds);
        })
        
      }
 
       calculateAge(dateString) {
         var newFormatDate = this.changeDateFortmat(dateString);
         var today = new Date();
         var birthDate = new Date(newFormatDate);
         var age = today.getFullYear() - birthDate.getFullYear();
         var m = today.getMonth() - birthDate.getMonth();
         if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
             age--;
         }
         return age;
     }
 
     calculateOpeningHours(hourString){
       var hourOpen = hourString.split(":")[0];
       var minutesOpen = hourString.split(":")[1];
 
       return new Date(0, 0, 0, hourOpen, minutesOpen);
     }
     
     changeDateFortmat(dateString)
     {
         return dateString.slice(3, 5) + '/' +  dateString.slice(0, 2) +  '/' + dateString.slice(6, 10);
     } 
}