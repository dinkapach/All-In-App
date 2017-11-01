import { AddPointsFunctions } from './../../../helpers/add-points-functions';
import { Manager } from './../../models/manager.model';
import { User } from './../../models/user.model';
import { UserService } from './../../../services/user.service';
import { NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ManagerService } from '../../../services/manager.service';

@Component({
    selector: 'user-card',
    templateUrl: 'user.card.html'
}) // this component is the user card component 
  // (show customers present every customer in the HTML with the tag <user-card></user-card>)
export class UserCardComponent {
    @Input()
    customer;
    @Output() userDeleted = new EventEmitter();

    constructor(private navCtrl: NavController,
        private userService: UserService, private managerService: ManagerService,
        private alertCtrl: AlertController, private addPointsFunctions: AddPointsFunctions) {
    }

    // when the manager choose to delete customer, remove the customer from DB
    deleteUserClick(customer) {
        this.managerService.deleteCustomerFromClub(customer.customerId._id, this.managerService.getLocalManager().clubId)
            .subscribe(isDeleted => {
                if (isDeleted) {
                    alert("user deleted from club succecfully");
                }
            })
    }

    // when the manager need to add point to customer
    onClickAddPoints() {
        let title = "Add Points";
        let message = "insert the how many points to add"

        this.showAddPrompt(title, message)
    }

    // when the manager need to subscribe points to user
    onClickSubscribePoints() {
        let title = "subscribe Points";
        let message = "insert the how many points to subscribe"

        this.showRemovePrompt(title, message)
    }

    // the manager need to enter the amount, and how mach percent of the amount to add to the points
    showAddPrompt(title, message) {
        let prompt = this.alertCtrl.create({
            title: title,
            message: message,
            inputs: [
                {
                    name: 'amount',
                    placeholder: 'Amount'
                },
                {
                    name: 'percent',
                    placeholder: 'Percent'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.addPointsToCustomer(data.amount, data.percent);
                    }
                }
            ]
        });
        prompt.present();
    }

    // the manager need to insert how many points to subscribe
    showRemovePrompt(title, message) {
        let prompt = this.alertCtrl.create({
            title: title,
            message: message,
            inputs: [
                {
                    name: 'points',
                    placeholder: 'Points'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.subscribePointsFromCustomer(data.points)
                    }
                }
            ]
        });
        prompt.present();
    }

    // add point to customer and update the DB
    addPointsToCustomer(amount, percent) {
        let points = this.addPointsFunctions.calculatePointsAmountByGivenPercent(amount, percent);
        this.managerService.addPointsToCustomerById(this.customer.customerId._id, this.managerService.getLocalManager().clubId, points)
            .subscribe(res => {
                if (res.isUpdated) {
                    this.customer.points = res.newPoints;
                }
                else {
                    console.log("err");
                }
            })
    }

    // subscribe points from customer and upate the DB
    subscribePointsFromCustomer(points) {
        this.managerService.subscribePointsToCustomerById(this.customer.customerId._id, this.managerService.getLocalManager().clubId, points)
            .subscribe(res => {
                if (res.isUpdated) {
                    this.customer.points = res.newPoints;
                }
                else {
                    console.log("err");
                }
            })
    }
}