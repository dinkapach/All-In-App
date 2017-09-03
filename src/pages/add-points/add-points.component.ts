import { ManagerService } from './../../services/manager.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {UserClub} from '../.././models/user-club-model';
// import {ManagerRepository} from '../.././database/repositories/manager.repository';
import 'rxjs/add/operator/map';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';




@Component({
    selector: 'add-points',
    templateUrl : 'add-points.html'
})
export class AddPointsComponent{
    formData : FormGroup;
    
  
     constructor(private fBuilder : FormBuilder, private http: Http, 
     private managerService: ManagerService, private navCtrl : NavController) {
        this.formData = fBuilder.group ({
            'id' : ["", Validators.required],
            'points' : ["", Validators.required],
            
        })
     }

 addingPointsToCustomerById(){
        var id = this.formData.value.id;
        var points = this.formData.value.points;
        while ((id == "") || (points == "")){
            alert("fill all the blanks");
        }


        this.managerService.addPointsToCustomerById(id, 10, points);  //change to current club 
    }
 }