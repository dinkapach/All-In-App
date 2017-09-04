import { Manager } from './../../models/manager.model';
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
    customer;
    // userDisplay : User;

    @Output() userDeleted = new EventEmitter();

    constructor(private clubService: ClubService, private navCtrl: NavController,
        private userService: UserService, private managerService: ManagerService,
        private alertCtrl: AlertController) {
    }

    ngOnInit() {
        console.log(this.customer);
        console.log(this.customer._id);
        //     if (this.userClub != null){
        //     this.managerService.getCustomerDetails(this.userClub.customerId)
        //     .subscribe(userDisplay=>{

        //         this.userDisplay = userDisplay;
        //     })
        // }
    }

    deleteUserClick(customer) {
        console.log(this.managerService.getLocalManager().clubId);
        console.log("deleteUserClick, user to removee:", customer);
        // this.userService.getUserById(userToRemove.customerId.id);

        this.managerService.deleteCustomerFromClub(customer.customerId._id, this.managerService.getLocalManager().clubId)
            .subscribe(isDeleted => {
                if (isDeleted) {
                    console.log("user deleted from club succecfully");
                    this.presentAlert();
                }
            })
    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            subTitle: 'user deleted from club succecfully',
            buttons: ['סבבה']
        });
        alert.present();
        alert.onDidDismiss(() => {
            this.navCtrl.pop();
        });
    }

    onClickAddPoints() {
        let title = "Add Points";
        let message = "insert the how many points to add"

        this.showAddPrompt(title, message)
    }

    onClickSubscribePoints() {
        let title = "subscribe Points";
        let message = "insert the how many points to subscribe"

        this.showRemovePrompt(title, message)
    }


    showAddPrompt(title, message) {
        let prompt = this.alertCtrl.create({
            title: title,
            message: message,
            inputs: [
                {
                    name: 'points',
                    placeholder: 'Points'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.addPointsToCustomer(data.points)
                    }
                }
            ]
        });
        prompt.present();
    }

    showRemovePrompt(title, message) {
        let prompt = this.alertCtrl.create({
            title: title,
            message: message,
            inputs: [
                {
                    name: 'points',
                    placeholder: 'Points'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.subscribePointsFromCustomer(data.points)
                    }
                }
            ]
        });
        prompt.present();
    }


    addPointsToCustomer(points) {
        this.managerService.addPointsToCustomerById( this.customer.customerId._id, this.managerService.getLocalManager().clubId, points)
        .subscribe( res => {
            console.log("is updated", res);
            if(res.isUpdated){
                this.customer.points = res.newPoints;
            }
            else{
                console.log("err");
            }
        })
    }

    subscribePointsFromCustomer(points) {
        this.managerService.subscribePointsToCustomerById( this.customer.customerId._id, this.managerService.getLocalManager().clubId, points)
        .subscribe( res => {
            console.log("is updated");
            if(res.isUpdated){
                this.customer.points = res.newPoints;
            }
            else{
                console.log("err");
            }
        })
    }

}