import { User } from './../../models/user.model';
import { Club } from './../../models/club.model';
import { UserService } from './../../services/user.service';
//import { ClubDetailsComponent } from './../club-details/club.details.component';
import { NavController, AlertController } from 'ionic-angular';
import { Credit } from './../../models/credit.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ClubService } from './../../services/club.service';
import { EditCreditComponent } from './../edit-credit/edit-credit.component';
import { UserClub } from './../../models/userClub.model';
import { ManagerService } from '../../services/manager.service';


@Component({
    selector: 'user-card',
    templateUrl: 'user.card.html'
})
export class UserCardComponent implements OnInit {
    @Input()
    userClub : UserClub;
    userDisplay : User;
    @Output() userDeleted = new EventEmitter();

    constructor(private clubService : ClubService, private navCtrl: NavController,
    private userService: UserService,private managerService: ManagerService, 
    private alertCtrl: AlertController) {


    }

    ngOnInit() {
       
        if (this.userClub != null){
        this.managerService.getCustomerDetails(this.userClub.customerId)
        .subscribe(userDisplay=>{
            
            this.userDisplay = userDisplay;
        })
    }
    }

    deleteUserClick(userToRemove){
        console.log("deleteUserClick, user to removee:", userToRemove)
        this.managerService.deleteCustomerFromClub(userToRemove, this.managerService.getLocalManager().clubId)
        .subscribe(isDeleted => {
            if(isDeleted) {
                console.log("user deleted from club succecfully");
                this.presentAlert();
            }
        })   
    }

    presentAlert(){
        let alert = this.alertCtrl.create({
            subTitle: 'user deleted from club succecfully',
            buttons: ['סבבה']
        });
        alert.present();
        alert.onDidDismiss(() => {
            this.navCtrl.pop();
        });
    }
}