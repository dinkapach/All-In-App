import { ManagerService } from './../../services/manager.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
// import {ManagerRepository} from '../.././database/repositories/manager.repository';
import 'rxjs/add/operator/map';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'subscribe-points',
    templateUrl : 'subscribe-points.html'
})
export class SubscirbePointsComponent{
    formData : FormGroup;

  
     constructor(private fBuilder : FormBuilder, private http: Http, private managerService: ManagerService, private navCtrl : NavController) {
        this.formData = fBuilder.group ({
            'id' : ["", Validators.required],
            'points' : ["", Validators.required],
            
        })
     }

 subscribingPoints(){
         var id = this.formData.value.id;
        var points = this.formData.value.points;
        this.managerService.subscribePointsToCustomerById(id, 10, points); //change to current club 
    }

 }