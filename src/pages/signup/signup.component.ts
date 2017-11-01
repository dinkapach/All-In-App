import { LoginComponent } from './../login/login.component';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { SigningService } from '../../services/signing.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'signup',
    templateUrl: 'signup.html'
})
export class SignupComponent {
    private formData: FormGroup;
    private url: string;
    private newCustomer: User;

    constructor(private fBuilder: FormBuilder, private http: Http, private navCtrl: NavController,
        private signingService: SigningService) {
        this.newCustomer = new User();
        this.buildForm();
    }

    buildForm(){
        this.formData = this.fBuilder.group({
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
    }

    // when new user submit, create the user in DB
    onSubmitForm() {
        this.newCustomer.joinDate = new Date();
        this.newCustomer.email = this.newCustomer.email.toLowerCase();
        this.signingService.signupUser(this.newCustomer)
            .subscribe(newCust => {
                if (newCust) {
                    alert("User singup" + newCust);
                    this.navCtrl.pop();
                }
                else {
                    alert("Singup failed" + newCust);
                }
            },
            err => {
                alert("Singup failed" + err._body);
            });
    }

    goToLoginPage() {
        this.navCtrl.pop();
    }
}