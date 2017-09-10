import { UserClub } from './../../../models/userClub.model';
import { Club } from './../../../models/club.model';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UserCardComponent } from '../user-card/usercard.component';

import 'rxjs/add/operator/map';
import { ClubCardComponent } from '../clubs/club-card/club.card.component';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ManagerService } from '../../../services/manager.service';


@Component({
  selector: 'show-customer',
  templateUrl: 'show-customer.html'
})
export class ShowCustomerComponent {
  club: Club;
  userCard: UserClub;
  customersArray: UserClub[];
  searchCustomer: string;
  optionToSerch: string = "id";

  constructor(private fBuilder: FormBuilder, private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController, private managerService: ManagerService) {

    this.club = this.managerService.getLocalClub();
    this.customersArray = this.managerService.getLocalCustomers();
  }

  ngOnInit() {
  }

  handleUserDeleted(userToRemove) {
  }


  searchCustomers() {
    if (this.optionToSerch != "points") {
      this.customersArray = this.club.usersClub.filter(customer => {
        return customer.customerId[this.optionToSerch].toString().toLowerCase().startsWith(this.searchCustomer.toLowerCase());
      });
    }
    else {
      this.customersArray = this.club.usersClub.filter(customer => {
        return customer[this.optionToSerch].toString().toLowerCase().startsWith(this.searchCustomer.toLowerCase());
      });
    }

  }


}