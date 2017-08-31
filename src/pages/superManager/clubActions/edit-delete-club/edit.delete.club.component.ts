import { Club } from './../../../../models/club.model';
import { SuperManagerService } from './../../../../services/superManager.service';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'edit-delete-club',
    templateUrl: 'edit.delete.club.html'
})
export class EditDeleteClubComponent implements OnInit{
    clubsArr: Club[];
    searchclub: string;
    tempClubArr: Club[];

    constructor(private fBuilder : FormBuilder, private navParams: NavParams,
        private navCtrl: NavController, private alertCtrl: AlertController,
        private superManagerService: SuperManagerService) {
         this.initClubsArr();
    }

    ngOnInit() {
    }

    initClubsArr(){
        this.clubsArr = [];
        this.superManagerService.getClubsArr()
        .subscribe(result => {
            console.log("result from inint managersArr", result);
            if(result.isAuth){
                this.clubsArr = result.clubArr;
                this.tempClubArr = this.doDeepCopyOfArr(this.clubsArr);
            }
            else {
                console.log("super manager error in get manager arr");
            }
        })

    }

    handleClubDeleted(clubToRemove){
        this.clubsArr = this.clubsArr.filter(currManager => {
            return currManager.id != clubToRemove.id;
        })
    }

    searchClubs() {
        this.clubsArr = this.tempClubArr.filter(club => {
            return club.name.toLowerCase().startsWith(this.searchclub);
        });
    }

    doDeepCopyOfArr(arrToCopy) {
        let copiedArr = [];
        arrToCopy.forEach(element => {
            copiedArr.push(element);
        });
        return copiedArr;
    }

}