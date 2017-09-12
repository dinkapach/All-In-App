import { ViewController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    template:
    `   <ion-list>
    <ion-item>
        <ion-label>Sales</ion-label>
        <ion-checkbox [(ngModel)]="isSales"></ion-checkbox>
    </ion-item>
    <ion-item>
        <ion-label>Club Details</ion-label>
        <ion-checkbox [(ngModel)]="isClubDetails"></ion-checkbox>
    </ion-item>
    <ion-item>
        <ion-label>Points</ion-label>
        <ion-checkbox [(ngModel)]="isPoints"></ion-checkbox>
    </ion-item>
    <button ion-button (click)="filter()">OK</button>
    </ion-list> 


    `
})
    // we download this option, but its here if we would like to return this option
    // when the user pick option it'll present the option as details on every club card
export class FilterClubDetailsComponent {
   // the options to present as mini details on every club card 
    isSales: boolean;
    isClubDetails: boolean;
    isPoints: boolean;

    constructor(private viewCtrl: ViewController) { }

    // the chosen one will be set to true
    filter() {
        const isSales = this.isSales;
        const isClubDetails = this.isClubDetails;
        const isPoints = this.isPoints;

        this.viewCtrl.dismiss({
            isSales,
            isClubDetails,
            isPoints

        });
    }
}



