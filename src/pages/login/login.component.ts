import { SuperManagerDashboardComponent } from './../superManager/super-manager-dashboard/super.manager.dashboard.component';
import { SigningSuperManagerService } from './../../services/signing.superManager.service';
import { UserService } from './../../services/user.service';
import { DashboardComponent } from './../customer/dashboard/dashboard.component';
import { SignupComponent } from './../signup/signup.component';
import { NavController, AlertController } from 'ionic-angular';
import { SigningService } from './../../services/signing.service';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import { ManagerComponent } from '../managers/manager/manager.component';
import { LoadingService } from '../../helpers/loading-service';

// this is the login component for managers, super manager or user

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    formData: FormGroup;
    isManager: boolean;
    isSuperManager: boolean;
    email: string;
    password: string;

    constructor(private fBuilder: FormBuilder, private alertCtrl: AlertController, private http: Http,
        private signService: SigningService, private navCtrl: NavController, private signingSuperManager: SigningSuperManagerService,
        private userService: UserService, private loadingService: LoadingService) {
        this.isManager = false;
        this.formData = fBuilder.group({
            'email': ["", Validators.required],
            'password': ["", Validators.required]
        })
    }

    submitLogin() {
        this.loadingService.presentLoading();
        if (this.isSuperManager) {
            // the super manager is separated, 
            // from the reason we'll want in the future to put the super manager in another application 
            this.signingSuperManager.loginSuperManager(this.email.toLowerCase(), this.password)
                .subscribe(superManager => {
                    if (superManager) {
                        this.navCtrl.setRoot(SuperManagerDashboardComponent, { superManager: superManager });
                    }
                    else {
                        console.log("problam in submit login for super manager");
                    }
                },
                err => {
                    console.log(err);
                },
                () => {
                    this.loadingService.dismissLoading();
                });
        }
        else {
            this.signService.loginUser(this.email.toLowerCase(), this.password, this.isManager)
                .subscribe(isAuth => {
                    console.log(isAuth);
                    if (isAuth) {
                        this.gotoDashboard();
                    }
                    else {
                        console.log('user not connected');
                    }
                },
                err => {
                    console.log(err);
                },
                () => {
                    this.loadingService.dismissLoading();
                });
        }
    }

    // go to the relevnt dashboard (user to user dashboard and manager to manager dashboard)
    gotoDashboard() {
        if (this.isManager) {
            this.navCtrl.setRoot(ManagerComponent);
        }
        else {
            this.navCtrl.setRoot(DashboardComponent);
        }
    }

    goToSignUpPage() {
        this.navCtrl.push(SignupComponent);
    }
}