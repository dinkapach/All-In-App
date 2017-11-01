import { NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Credit } from '../../../../models/credit.model';
import { User } from '../../../../models/user.model';
import { ClubService } from '../../../../services/club.service';
import { UserService } from '../../../../services/user.service';
import { EditCreditComponent } from '../edit-credit/edit-credit.component';

// this is the credit card component, when we present all credits,
// we present them from the HTML with the tag <credit-card></credit-card>
// so this component is show of one credit

@Component({
    selector: 'credit-card',
    templateUrl: 'credits.card.html'
})
export class CreditsCardComponent implements OnInit {
    @Input()
    credit: Credit;
    user: User;
    doesNotificationScheduled: boolean;
    firstInitToggle: boolean = true;
    @Output() creditDeleted = new EventEmitter();

    constructor(private clubService: ClubService, private navCtrl: NavController,
        private userService: UserService, private alertCtrl: AlertController,
        private localNotifications: LocalNotifications) {
        this.user = this.userService.getLocalUser();
    }

    ngOnInit() {
        this.checkIfNotificationScheduled(this.credit.id);
    }

    checkIfNotificationScheduled(notificationId: number) {
        this.localNotifications.isScheduled(notificationId)
            .then(isScheduled => {
                this.doesNotificationScheduled = isScheduled;
            })
            .catch(err => console.log(err));
    }

    editCreditClick(credit) {
        this.navCtrl.push(EditCreditComponent, { credit: credit });
    }

    cancelNotification(notificationId: number) {
        this.localNotifications.cancel(notificationId)
            .then(isCanceled => {
                if (isCanceled) {
                    this.doesNotificationScheduled = false;
                    alert("notification canceled");
                }
            })
            .catch(err => console.log(err));
    }

    scheduleNotification(notificationId: number) {
        this.localNotifications.schedule({
            title: "Credit About To Expire",
            id: this.credit.id,
            text: "Your credit in " + this.credit.id + " is about to expire.",
            at: new Date(this.credit.dateOfExpired)
        });
        alert("notification scheduled");
    }

    handleNotificationToggle() {
        if (this.doesNotificationScheduled) {
            this.scheduleNotification(this.credit.id);
        }
        else {
            this.cancelNotification(this.credit.id);
        }
    }

    onChangeNotificationToggle() {
        this.handleNotificationToggle();
    }

    deleteCreditClick(credit) {
        this.userService.deleteCredit(credit).
            subscribe(isAuth => {
                if (isAuth) {
                    this.creditDeleted.emit(credit);
                }
                else {
                    console.log("Error deleting credit");
                }
            })
    }
}