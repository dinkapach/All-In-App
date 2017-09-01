import { LoginComponent } from './../login/login.component';
import { AddCreditComponent } from './../add-credit/add-credit.component';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

//TODO:
//Send the updated fields instead of everything

@Component({
    selector: 'edit-password',
    templateUrl : 'edit-password.html'
})
export class EditPasswordComponent{
    currentPassword: string;
    newPassword: string;
    newPasswordVarify: string;
    formData : FormGroup;

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private userService: UserService, private navParams: NavParams, private alertCtrl: AlertController) {

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

        this.userService.changePassword(this.currentPassword, this.newPassword)
        .subscribe(isAuth => {
            console.log(isAuth);
            if(isAuth){
                this.showAlert("password Updated" + isAuth);
                console.log(isAuth);
                this.navCtrl.pop();
            }
            else{
                this.showAlert("password not Updated"+isAuth);
            }
        })
    }

    checkPassword(){

    }

    showAlert(message){
    let alert = this.alertCtrl.create({
    //   title: 'Title!',
      subTitle: message,
      buttons: ['סבבה']
    });
    alert.present();
    }
}