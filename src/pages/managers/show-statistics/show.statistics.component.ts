import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Club } from './../../../models/club.model';
import { UserClub } from './../../../models/userClub.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManagerService } from '../../../services/manager.service';

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
    childs: number = 0;
    teenagers: number = 0;;
    olds: number = 0;;
    totalCustomers: number = 0;
    joinedThisMonth: number = 0;

    constructor(public navCtrl: NavController, private navParams: NavParams,
        private fBuilder: FormBuilder,
        private alertCtrl: AlertController, private managerService: ManagerService) {
        this.club = this.navParams.get("club");
        this.getStatistics();
    }

    ionViewDidLoad() {
        this.buildGraph();
    }

    buildGraph() {
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
                            beginAtZero: true,
                            stepSize: 1,
                            maxTicksLimit: 20
                        }
                    }]
                }
            }

        });
    }

    getStatistics() {
        var date = new Date();
        var thisMonth = date.getMonth;
        var customersArr;
        customersArr = this.managerService.getLocalCustomers()
        customersArr.forEach(customer => {
            var date = new Date(customer.customerId.birthday);
            var age = new Date().getFullYear() - date.getFullYear();
            if (age < 20) {
                this.childs++;
            }
            else if (age < 30) {
                this.teenagers++;
            }
            else {
                this.olds++;
            }
        });
        this.totalCustomers = this.childs + this.teenagers + this.olds;
        this.joinedThisMonth = this.getNumOfJoinedThisMonth();
    }

    getNumOfJoinedThisMonth() {
        var numOfJoins = 0;
        var thisDate = new Date();
        var thisMonth = thisDate.getMonth();
        this.club.usersClub.forEach(userClub => {
            var joinDate = new Date(userClub.joinDate)
            if (joinDate.getMonth() == thisMonth) {
                numOfJoins++;
            }
        })

        return numOfJoins;
    }
}