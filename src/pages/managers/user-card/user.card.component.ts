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
})
export class UserCardComponent {
    @Input()
    customer;
    @Output() userDeleted = new EventEmitter();

    constructor(private navCtrl: NavController,
        private userService: UserService, private managerService: ManagerService,
        private alertCtrl: AlertController, private addPointsFunctions: AddPointsFunctions) {
    }

    deleteUserClick(customer) {
        this.managerService.deleteCustomerFromClub(customer.customerId._id, this.managerService.getLocalManager().clubId)
            .subscribe(isDeleted => {
                if (isDeleted) {
                    console.log("user deleted from club succecfully");
                    alert("user deleted from club succecfully");
                }
            })
    }

    onClickAddPoints() {
        let title = "Add Points";
        let message = "insert the how many points to add"

        this.showAddPrompt(title, message)
    }

    onClickSubscribePoints() {
        let title = "subscribe Points";
        let message = "insert the how many points to subscribe"

        this.showRemovePrompt(title, message)
    }

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

    addPointsToCustomer(amount, percent) {
        let points = this.addPointsFunctions.calculatePointsAmountByGivenPercent(amount, percent);
        this.managerService.addPointsToCustomerById(this.customer.customerId._id, this.managerService.getLocalManager().clubId, points)
            .subscribe(res => {
                console.log("is updated", res);
                if (res.isUpdated) {
                    this.customer.points = res.newPoints;
                }
                else {
                    console.log("err");
                }
            })
    }

    subscribePointsFromCustomer(points) {
        this.managerService.subscribePointsToCustomerById(this.customer.customerId._id, this.managerService.getLocalManager().clubId, points)
            .subscribe(res => {
                console.log("is updated");
                if (res.isUpdated) {
                    this.customer.points = res.newPoints;
                }
                else {
                    console.log("err");
                }
            })
    }
}