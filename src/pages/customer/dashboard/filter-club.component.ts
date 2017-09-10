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
export class FilterClubDetailsComponent {
    isSales: boolean;
    isClubDetails: boolean;
    isPoints: boolean;

    constructor(private viewCtrl: ViewController) { }

    filter() {  
        const isSales = this.isSales;
        const isClubDetails = this.isClubDetails;
        const isPoints = this.isPoints;

        console.log( isSales,
            isClubDetails,
            isPoints)

        this.viewCtrl.dismiss({
            isSales,
            isClubDetails,
            isPoints

        });
    }


    //     `<ion-list radio-group [(ngModel)]="FilterClubDetailsComponent" >
//     <ion-item>
//       <ion-label>Sales</ion-label>
//       <ion-radio value="isSales" checked></ion-radio>
//     </ion-item>
//     <ion-item>
//       <ion-label>Club Details</ion-label>
//       <ion-radio value="isClubDetails"></ion-radio>
//     </ion-item>
//     <ion-item>
//       <ion-label>Points</ion-label>
//       <ion-radio value="isPoints"></ion-radio>
//     </ion-item>
//     <button ion-button (click)="filter()">OK</button>
//   </ion-list>
}



