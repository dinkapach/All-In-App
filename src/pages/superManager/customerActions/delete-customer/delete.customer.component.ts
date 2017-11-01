import { User } from './../../../../models/user.model';
import { SuperManagerService } from './../../../../services/superManager.service';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'delete-customer',
    templateUrl: 'delete.customer.html'
}) // this component presnt the customer so the super manager can choose customer to delete
export class DeleteCustomerComponent {
    customersArr: User[];
    searchCustomer: string;
    tempCustomerrArr: User[];

    constructor(private fBuilder: FormBuilder, private navParams: NavParams,
        private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
        this.initCustomersArr();
    }

    // init the customers array to display, so the super manager can choose manager to delete 
    initCustomersArr() {
        this.customersArr = [];
        this.superManagerService.getCustomerArr()
            .subscribe(result => {
                if (result.isAuth) {
                    this.customersArr = result.customerArr;
                    this.tempCustomerrArr = this.doDeepCopyOfArr(this.customersArr);
                }
                else {
                    console.log("super manager error in get manager arr");
                }
            })
    }

    // when customer delted, the component that delete the customer emit this component 
    // that the user deleted so we can remove it from the array that displays the users
    handleCustomerDeleted(customerToRemove) {
        this.customersArr = this.customersArr.filter(currCustomer => {
            return currCustomer.id != customerToRemove.id;
        })
    }

    // serch cusomers in the search bar
    searchCustomers() {
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