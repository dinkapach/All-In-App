import { LoginComponent } from './../login/login.component';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { ManagerService } from '../../services/manager.service';



@Component({
    selector: 'edit-password',
    templateUrl : 'edit.passwordManager.html'
})
export class EditPasswordManagerComponent{

    currentPassword: string;
    newPassword: string;
    newPasswordVarify: string;
    formData : FormGroup;

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private managerService: ManagerService, private navParams: NavParams, private alertCtrl: AlertController) {

        this.formData = fBuilder.group({
            'currentPassword': ["", Validators.required],
            'newPassword': ["", Validators.required],
            'newPasswordVarify': ["", Validators.required]}, {validator: this.areEqual});
    }

    areEqual(fg: FormGroup) {
        let valid = fg.value.newPassword == fg.value.newPasswordVarify;
        if (valid) {
          return null;
        }
        return {
          areEqual: true
        };
    }
    

    onClickChangePassword() {
        console.log("changingggg passwordd");
        this.managerService.changePassword(this.currentPassword, this.newPassword)
        .subscribe(isAuth => {
            console.log(isAuth);
            if(isAuth){
                alert("Password Updated");
                console.log(isAuth);
                this.navCtrl.pop();
            }
            else{
                // alert("password not Updated"+isAuth);
            }
        })
    }
}