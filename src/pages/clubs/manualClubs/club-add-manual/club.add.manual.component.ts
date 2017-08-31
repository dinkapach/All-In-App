import { UserService } from './../../../../services/user.service';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './../../../../models/user.model';
import { ClubManually } from './../../../../models/clubManually.model'

import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 


@Component({
    selector: 'club-add-manual',
    templateUrl: 'club.add.manual.html'
})
export class AddClubManualComponent {
    user: User;
    clubNew: ClubManually;
    formData : FormGroup;

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private userService: UserService, private navParams: NavParams, private alertCtrl: AlertController) {
        this.user = this.userService.getLocalUser();
        this.clubNew = new ClubManually();
        this.clubNew.isManual = true;
        
        this.formData = fBuilder.group({
            'id': ["", Validators.required],
            'name': ["", Validators.required],
            'address': ["", Validators.required],
            'phoneNumber': ["", Validators.required],
            'img': [""],
            'points': [""],

        })
    }

    updateInfo() {
            if (this.clubNew) {
            let isExists = false; 
            // check if the user already have the club
            this.user.manuallyClubs.forEach((club) => {
                if(club.id == this.clubNew.id){
                    isExists = true;
                    }
            })
            console.log(isExists);

            if(!isExists) {  //add club only if its new club
                this.user.manuallyClubs.push(this.clubNew);
                this.userService.updateUser(this.user)
                    .subscribe(isUpdated => {
                        if (isUpdated) {
                            console.log("updated");
                            let alert = this.alertCtrl.create({
                                subTitle: 'Club Added',
                                buttons: ['סבבה']
                            });
                        alert.present();
                        alert.onDidDismiss(() => {
                            this.navCtrl.pop();
                        });
                        }
                        else {
                            console.log("not updated");
                        }
                    })
            }
            else{
                let alert = this.alertCtrl.create({
                    subTitle: 'Club id already exist',
                    buttons: ['סבבה']
                });
            alert.present();
            alert.onDidDismiss(() => {
                this.navCtrl.pop();
            });
            }
        }
    }

    onBlur(event){
        var formName = event.target.attributes['formControlName'].value;
        this.clubNew[formName] = this.formData.value[formName];
    }


}