import { User } from './../../../../models/user.model';
import { SuperManagerService } from './../../../../services/superManager.service';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'delete-customer',
    templateUrl: 'delete.customer.html'
})
export class DeleteCustomerComponent {
    customersArr: User[];
    searchCustomer: string;
    tempCustomerrArr: User[];

    constructor(private fBuilder: FormBuilder, private navParams: NavParams,
        private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
        this.initCustomersArr();
    }

    initCustomersArr() {
        this.customersArr = [];
        this.superManagerService.getCustomerArr()
            .subscribe(result => {
                console.log("result from inint managersArr", result);
                if (result.isAuth) {
                    this.customersArr = result.customerArr;
                    this.tempCustomerrArr = this.doDeepCopyOfArr(this.customersArr);
                }
                else {
                    console.log("super manager error in get manager arr");
                }
            })
    }

    handleCustomerDeleted(customerToRemove) {
        this.customersArr = this.customersArr.filter(currCustomer => {
            return currCustomer.id != customerToRemove.id;
        })
    }

    searchManagers() {
        this.customersArr = this.tempCustomerrArr.filter(customer => {
            return customer.id.toString().startsWith(this.searchCustomer);
        });
    }

    doDeepCopyOfArr(arrToCopy) {
        let copiedArr = [];
        arrToCopy.forEach(element => {
            copiedArr.push(element);
        });
        return copiedArr;
    }
}