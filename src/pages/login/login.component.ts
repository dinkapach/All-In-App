import { SuperManagerDashboardComponent } from './../superManager/super-manager-dashboard/super.manager.dashboard.component';
import { SigningSuperManagerService } from './../../services/signing.superManager.service';
import { UserService } from './../../services/user.service';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { SignupComponent } from './../signup/signup.component';
import { NavController, AlertController } from 'ionic-angular';
import { SigningService } from './../../services/signing.service';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import 'rxjs/add/operator/map';
import { ManagerComponent } from '../manager/manager.component';
import { LoadingService } from '../../helpers/loading-service';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    formData : FormGroup;
    isManager : boolean;
    isSuperManager : boolean;
    email: string;
    password: string;
    
    constructor(private fBuilder : FormBuilder, private alertCtrl: AlertController, private http: Http, 
    private signService : SigningService, private navCtrl : NavController, private signingSuperManager:SigningSuperManagerService,
    private userService: UserService, private loadingService: LoadingService) {
        this.isManager = false;
        this.formData = fBuilder.group({
            // 'email': ["allin@gmail.com", Validators.required],
            // 'password' : ["1234567", Validators.required]
            'email': ["", Validators.required],
            'password' : ["", Validators.required]
        })
    }
   
    submitLogin() {
        // console.log("on login");
        // console.log("email: ", this.email);
        // console.log("password: ", this.password);
        // this.email = this.email.toLowerCase();
        this.loadingService.presentLoading();
        //this.isSuperManager = true; // DELETE
        if(this.isSuperManager){
            this.signingSuperManager.loginSuperManager(this.email.toLowerCase(), this.password)
            .subscribe(superManager => {
                if(superManager){
                    this.navCtrl.setRoot(SuperManagerDashboardComponent, {superManager: superManager});
                }
                else{
                    console.log("problam in submit login for super manager");
                    // alert("Your user name or password inncorrect");
                }
            },
            err => {
                console.log(err);
                // alert(err);
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
                    // alert("Your user name or password inncorrect");
                    // this.loadingService.dismissLoading();
                }
            },
            err => {
                console.log(err);
                // alert(err);
            },
            () => {
                this.loadingService.dismissLoading();
            });
        }
    }

    gotoDashboard(){
        if(this.isSuperManager) {
            alert("login super manager success");
        }
        else if(this.isManager) {
            this.navCtrl.setRoot(ManagerComponent);
            alert("login manager success");
        }
        else {
            this.navCtrl.setRoot(DashboardComponent);            
            alert("login customer success");
        }
    }

    goToSignUpPage(){
        this.navCtrl.push(SignupComponent);
    }
}