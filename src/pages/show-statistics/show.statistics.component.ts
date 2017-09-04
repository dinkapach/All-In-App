import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Club } from './../../models/club.model';
import { UserClub } from './../../models/userClub.model';
import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { Http } from '@angular/http';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'show-statistics',
  templateUrl: 'show.statistics.html'
})
export class ShowStatisticsComponent {
 
    @ViewChild('barCanvas') barCanvas;
    club: Club;
    barChart: any;
    userCard: UserClub;
    customerDisplay: UserClub[];
    searchCustomer: string;
    childs : number = 0;
    teenagers : number = 0;;
    olds : number = 0;;
    totalCustomers  : number = 0;
    joinedThisMonth : number = 0;

    constructor(public navCtrl: NavController , private navParams: NavParams,
    private fBuilder : FormBuilder, private http: Http, private userService: UserService, 
        private alertCtrl: AlertController, private managerService: ManagerService) {
        this.club = this.navParams.get("club");
        this.getStatistics();
        
        console.log ("club in show :" , this.club);
        console.log("statisti childs:" + this.childs);
        console.log("statisti teenagers:" + this.teenagers);
        console.log("statisti ollds:" + this.olds);
        console.log("statisti total:" + this.totalCustomers);
        console.log("statisti joind:" + this.joinedThisMonth);
    }


 
    ionViewDidLoad() {
   
        
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            
            type: 'bar',
            data: {
                labels: ["childs(10-20)", "teens (20-30)", "Olds(30+)", "Total Customers", "Joined this mounth"],
                datasets: [{
                    label: '# of Votes',
                    data: [this.childs, this.teenagers, this.olds, this.totalCustomers, this.joinedThisMonth],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });
 
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