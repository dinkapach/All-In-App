import { LoginComponent } from './../login/login.component';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { NavController } from 'ionic-angular';

import 'rxjs/add/operator/map';
//import * as environment from './../../../environment.json';
import { SigningService } from '../../services/signing.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'signup',
    templateUrl : 'signup.html'
})
export class SignupComponent{
    private formData : FormGroup;
    private url: string;
    private newCustomer: User;

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private signingService: SigningService) {
        
      this.newCustomer = new User();

        this.formData = fBuilder.group({
            'id': ["", Validators.required],
            'firstName': ["", Validators.required],
            'lastName': ["", Validators.required],
            'password': ["", Validators.required],
            'address': ["", Validators.required],
            'email': ["", Validators.required],
            'phoneNumber': ["", Validators.required],
            'birthday': ["", Validators.required],
            'username': ["", Validators.required],
        });
        // this.formData.controls['id'].setValue("432");
        // this.formData.controls['firstName'].setValue("hello");
    }

    submitSingup() {
        console.log(this.newCustomer);
        this.newCustomer.joinDate = new Date();
        console.log(this.newCustomer.joinDate);
        this.signingService.signupUser(this.newCustomer)
        .subscribe(newCust => {
            if(newCust){
                console.log(newCust);
                alert("User singup" + newCust);
                this.navCtrl.pop();
            }
            else{
                alert("Singup failed" + newCust);
            }
        },
            err =>{
                console.log(err);
                alert("Singup failed" + err._body);
    });
    }

    goToLoginPage() {
        this.navCtrl.pop();
    }
}