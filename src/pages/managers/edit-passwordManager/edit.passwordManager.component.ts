import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ManagerService } from "../../../services/manager.service";

@Component({
    selector: 'edit-password',
    templateUrl: 'edit.passwordManager.html'
})
export class EditPasswordManagerComponent {
    currentPassword: string;
    newPassword: string;
    newPasswordVarify: string;
    formData: FormGroup;

    constructor(private fBuilder: FormBuilder, private navCtrl: NavController,
        private managerService: ManagerService, private navParams: NavParams, private alertCtrl: AlertController) {
        this.buildForm();
    }

    buildForm() {
        this.formData = this.fBuilder.group({
            'currentPassword': ["", Validators.required],
            'newPassword': ["", Validators.required],
            'newPasswordVarify': ["", Validators.required]
        }, { validator: this.areEqual });
    }

    // in the form the user requires to enter the password twice, validate thet both eaual
    areEqual(fg: FormGroup) {
        let valid = fg.value.newPassword == fg.value.newPasswordVarify;
        if (valid) {
            return null;
        }
        return {
            areEqual: true
        };
    }

    // change the password in the DB
    onClickChangePassword() {
        this.managerService.changePassword(this.currentPassword, this.newPassword)
            .subscribe(isAuth => {
                if (isAuth) {
                    alert("Password Updated");
                    this.navCtrl.pop();
                }
            });
    }
}