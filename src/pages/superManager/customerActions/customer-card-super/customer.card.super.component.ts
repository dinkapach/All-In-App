import { User } from './../../../../models/user.model';
import { SuperManagerService } from './../../../../services/superManager.service';
import { NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'customer-card-super',
    templateUrl: 'customer.card.super.html'
}) // this is the customer card that presented to super manager 
// (when present the customers, for every customer in the HTML,
//  present his details with tag <customer-card></customer-card> and thats how you get this component )
export class CustomerCardSuperComponent {
    @Input()
    customer: User;
    @Output() customerDeleted = new EventEmitter();

    constructor(private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
    }

    // when the super manager choose to delete customer, remove it from DB
    deleteCustomerClick(customer) {
        this.superManagerService.deleteCustomerFromDB(customer.id).
            subscribe(isAuth => {
                if (isAuth) {
                    this.customerDeleted.emit(customer);
                }
                else {
                    console.log("unSuccess");
                }
            });
    }
}