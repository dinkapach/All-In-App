import { User } from './../../../../models/user.model';
import { SuperManagerService } from './../../../../services/superManager.service';
import { NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'customer-card-super',
    templateUrl: 'customer.card.super.html'
})
export class CustomerCardSuperComponent {
    @Input()
    customer : User;
   @Output() customerDeleted = new EventEmitter();

    constructor( private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
    }

    deleteCustomerClick(customer) {
        this.superManagerService.deleteCustomerFromDB(customer.id).
        subscribe(isAuth => {
            console.log("From 'customer-card', print 'isAuth': ", isAuth);
            if(isAuth) {
            this.presentAlert();
            this.customerDeleted.emit(customer);
            }
            else{
                console.log("unSuccess");
            }
        });
    }


    presentAlert() {
        let alert = this.alertCtrl.create({
            subTitle: 'customer deleted',
            buttons: ['סבבה']
        });
        alert.present();
        // alert.onDidDismiss(() => {
        //     this.navCtrl.pop();
        // });
    }

}