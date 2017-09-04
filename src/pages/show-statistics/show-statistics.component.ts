import { UserClub } from './../../models/userClub.model';
import { Club } from './../../models/club.model';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Chart } from 'chart.js';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {UserCardComponent} from  '../user-card/usercard.component';
import 'rxjs/add/operator/map';
import { ClubCardComponent } from '../clubs/club-card/club.card.component';
import { Credit } from '../../models/credit.model';
import { Sale } from './../../models/sales.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ManagerComponent } from '../manager/manager.component';
import { ManagerService } from '../../services/manager.service';
import { HomePageComponent } from '../home-page/home.page.component';
import { ViewChild } from '@angular/core';



@Component({
    selector: 'show-statistics',
    templateUrl : 'show-statistics.html'
})
export class ShowStatisticsComponent{

   @ViewChild('barCanvas') barCanvas;
    club: Club;
    userCard: UserClub;
    customerDisplay: UserClub[];
    searchCustomer: string;
    childs : number = 0;
    teenagers : number = 0;;
    olds : number = 0;;
    totalCustomers  : number = 0;
    joinedThisMonth : number = 0;

      constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private userService: UserService, private navParams: NavParams,
        private alertCtrl: AlertController, private managerService: ManagerService) {
          
          this.club = this.navParams.get("club");
          this.getStatistics();
        }

      

        getStatistics(){
          var date = new Date();
          var thisMonth = date.getMonth;
          var customersArr;
         

        customersArr = this.managerService.getLocalCustomers()
       
        customersArr.forEach(customer => {
         
          var date = new Date(customer.customerId.birthday);
          var din = new Date(age);
          var age = new Date().getFullYear() - date.getFullYear(); 
          
          if (age < 20){
            this.childs++;
          }
          else if( age < 30){
            this.teenagers++;
          }
          else{
            this.olds++;
          }
        
        })   

        this.totalCustomers = this.childs + this.teenagers + this.olds;
           this.joinedThisMonth = this.getNumOfJoinedThisMonth();

           console.log("total customerssss: " + this.totalCustomers);
           this.navCtrl.push(HomePageComponent ,{totalCustomers: this.totalCustomers, 
             joinedThisMonth : this.joinedThisMonth, childs: this.childs, 
             olds: this.olds, teenagers: this.teenagers});

  
      }

      getNumOfJoinedThisMonth(){
        var numOfJoins = 0;
        var thisDate = new Date();
        var thisMonth = thisDate.getMonth();
          this.club.usersClub.forEach(userClub =>{
            var joinDate = new Date(userClub.joinDate)
            if(joinDate.getMonth() == thisMonth){
              numOfJoins++;
            }
          })

          return numOfJoins;
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
