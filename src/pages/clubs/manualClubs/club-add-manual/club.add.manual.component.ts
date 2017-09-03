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
    addClubForm : FormGroup;

    constructor(private fBuilder : FormBuilder, private http: Http, private navCtrl : NavController,
        private userService: UserService, private navParams: NavParams, private alertCtrl: AlertController) {
        this.user = this.userService.getLocalUser();
        this.clubNew = new ClubManually();
        this.clubNew.isManual = true;
        this.initNewClub();
        this.buildForm();
    }

    initNewClub(){
        this.clubNew = new ClubManually();
        this.clubNew.isManual = true;
        this.clubNew.id = Date.now();
    }

    buildForm(){
        this.addClubForm = this.fBuilder.group({
            'name': ["", Validators.required],
            'address': [""],
            'phoneNumber': [""],
            'img': [""],
            'points': [""],
        });
    }

    onClickAddClub() {
        console.log(this.clubNew);
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
        });
    }
}