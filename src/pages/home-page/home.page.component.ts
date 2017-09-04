import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html'
})
export class HomePageComponent {
 
    @ViewChild('barCanvas') barCanvas;
 
    barChart: any;
    childs : number = 0;
    teenagers : number = 0;;
    olds : number = 0;;
    totalCustomers  : number = 0;
    joinedThisMonth : number = 0;
    constructor(public navCtrl: NavController , private navParams: NavParams) {
        this.childs = this.navParams.get("childs");
        this.teenagers = this.navParams.get("teenagers");
        this.olds = this.navParams.get("olds");
        this.totalCustomers = this.navParams.get("totalCustomers");
         this.joinedThisMonth = this.navParams.get("joinedThisMonth");
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
}