import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
//import { ClubDetailsComponent } from './../club-details/club.details.component';
import { NavController, AlertController } from 'ionic-angular';
import { Credit } from './../../models/credit.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ClubService } from './../../services/club.service';
import { EditCreditComponent } from './../edit-credit/edit-credit.component';
// import { EditSaleComponent } from '../edit-sale/edit.sale.component';

@Component({
    selector: 'credit-card',
    templateUrl: 'credits.card.html'
})
export class CreditsCardComponent implements OnInit {
    @Input()
   credit : Credit;
   user : User;
   @Output() creditDeleted = new EventEmitter();

    constructor(private clubService : ClubService, private navCtrl: NavController,
    private userService: UserService, private alertCtrl: AlertController) {
        this.user = this.userService.getLocalUser();
    }

    ngOnInit() {
        console.log("from credit-card credit:", this.credit);
        // this.clubService.getCredits()
        // .subscribe( res => {
        //     this.credit = res;
        // })
    }

    onCreditClicked() {
      //  this.navCtrl.push(ClubDetailsComponent, {club : this.club});

    }

    editCreditClick(credit){
        this.navCtrl.push(EditCreditComponent, {credit: credit});
    }

    deleteCreditClick(credit){
        this.userService.deleteCredit(credit).
        subscribe(isAuth => {
            console.log("From 'delete-credit.component', print 'isAuth': ", isAuth);
            if(isAuth){
                let alert = this.alertCtrl.create({
                    subTitle: 'credit deleted',
                    buttons: ['סבבה']
                });
            alert.present();
            alert.onDidDismiss(() => {
                this.navCtrl.pop();
            });
            this.creditDeleted.emit(credit);
            }
            else{
                console.log("unSuccess");
            }
        })
    }

}