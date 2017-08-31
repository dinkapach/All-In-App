import { UserClub } from './../../models/userClub.model';
import { Club } from './../../models/club.model';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';

import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {UserCardComponent} from  '../user-card/usercard.component';

// import {ManagerRepository} from '../.././database/repositories/manager.repository';
import 'rxjs/add/operator/map';
import { ClubCardComponent } from '../clubs/club-card/club.card.component';
import { Credit } from '../../models/credit.model';

import { Sale } from './../../models/sales.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../services/user.service';
import { ManagerComponent } from '../manager/manager.component';
import { ManagerService } from '../../services/manager.service';


//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'show-customer',
    templateUrl : 'show-customer.html'
})
export class ShowCustomerComponent{
    club: Club;
    userCard: UserClub;
  
      constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private userService: UserService, private navParams: NavParams,
        private alertCtrl: AlertController, private managerService: ManagerService) {
         
          this.club = this.navParams.get("club");
        }

        
           
        handleUserDeleted(userToRemove){
        
        }
      // handleUserDeleted(userToRemove){
    //     this.userArr = this.userArr.filter(user => {
    //         return user.id != userToRemove.id;
    //     })
    // }


 }