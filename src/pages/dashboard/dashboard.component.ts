import { ClubManually } from './../../models/clubManually.model';
import {
    NavParams,
    LoadingController,
    ModalController,
    NavController,
    PopoverController
}
    from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClubDetailsComponent } from './../clubs/club-details/club.details.component';
import { ClubsListComponent } from './../clubs/clubs-list/clubs.list.component';
import { FilterClubDetailsComponent } from './filter-club.component';
import { Club } from './../../models/club.model';
import { ClubService } from './../../services/club.service';
import { UserService } from './../../services/user.service';
import { EditProfileComponent } from './../edit-profile/edit-profile.component';
import { AddClubManualComponent } from './../clubs/manualClubs/club-add-manual/club.add.manual.component';
import { User } from './../../models/user.model';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


import 'rxjs/add/operator/map';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
import { SigningService } from '../../services/signing.service';
import { LoginComponent } from '../login/login.component';
import { CustomerSettingsComponent } from '../customer-settings/customer-settings.component';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.html'
})
export class DashboardComponent implements OnInit {
    user: User;
    clubsDisplay: Club[];
    clubsManualDisplay: ClubManually[];
    searchClub: string;
    grid: Array<Array<Club>>;
    editProfilePage = EditProfileComponent;
    chosenOption: string;
    barcodeData : any;
    showClubSearchBar: Boolean = false;
    @ViewChild('clubSearchBar') clubSearchBar;
    

    constructor(private navParams: NavParams, private userService: UserService,
        private clubService: ClubService, private loader: LoadingController,
        private modalCtrl: ModalController, private navCtrl: NavController,
        private popOverCtrl: PopoverController, private storage: Storage,
        private signService : SigningService, private barcodeScanner: BarcodeScanner) {
        // this.grid = new Array<Array<Club>>();
        this.searchClub = '';
    }

    ngOnInit() {
        console.log("getting customer from service:")        
        this.user = this.userService.getLocalUser();
        this.clubsDisplay = this.user.clubs;
        this.clubsManualDisplay = this.user.manuallyClubs;
        // this.initGrid();
    }

    // ionViewWillEnter(){
    //     console.log("enter page");
    //     this.userService.updateLocalCustomer()
    //     .subscribe(updated =>{
    //         if(updated){
    //             this.fetchDataFromService();
    //         }
    //     });
    // }

    onClearClubSearchBar(){
        this.showClubSearchBar = !this.showClubSearchBar
    }

    onClickSearchButton(){
        console.log(this.clubSearchBar);
        this.clubSearchBar.setFocus();
        this.showClubSearchBar = !this.showClubSearchBar
    }

    fetchDataFromService(){
        this.user = this.userService.getLocalUser();
        this.refreshClubDispaly()
    }

    doRefresh(refresher){
        console.log('Begin async operation', refresher);
        this.userService.updateLocalCustomer()
        .subscribe(isAuth => {
            if (isAuth) {
                // alert("customer updated from server");
                this.fetchDataFromService();
            }
            else {
                console.log('user not connected not auth');
                // alert("Not Updated");
            }
        },
        err => {
            // alert("Connection Error");
            console.log(err);
        },
        () => {
            console.log("yay");
            refresher.complete();
        });
    }

    onClickAddClubByScanQR(){
        this.barcodeScanner.scan().then((barcodeData) => {
            this.barcodeData = barcodeData; //JSON.stringify(barcodeData);
            if(this.barcodeData.cancelled == 0){
            let clubObjId = this.barcodeData.text;
            this.clubService.getClubByObjectId(clubObjId)
            .subscribe( clubRes => {            
                if(clubRes){
                    this.addClubToCustomer(clubRes);
                }
                else {
                    alert("club wasnt save")
                }
            })
        }
    }, (err) => {
        console.log(err);            
        // this.barcodeData = JSON.stringify(err);
        });
        
    }

    onClickAddClub() {
        let clubsModal = this.modalCtrl.create(ClubsListComponent);
        clubsModal.onDidDismiss(clubChosen => {
            this.addClubToCustomer(clubChosen);
        });
        clubsModal.present();
    }

    addClubToCustomer(clubChosen) {
        if (clubChosen) {
            let isExists = false; 
            // check if the user already have the club
            this.user.clubs.forEach((club) => {
                if(club.id == clubChosen.id){
                    isExists = true;
                    }
            })
            console.log(isExists);

            if(!isExists) {  //add club only if its new club
                clubChosen.isManual = false;
                this.user.clubs.push(clubChosen);
                this.clubService.addClubToCustomer(clubChosen)
                    .subscribe(isUpdated => {
                        if (isUpdated) {
                            console.log("updated");
                        }
                        else {
                            console.log("not updated");
                        }
                    })
            }
        }
    }

    onClickSettings(){
        this.navCtrl.push(CustomerSettingsComponent);
    }

    searchClubs() {
        console.log("on search clubs: " + this.searchClub);
        this.clubsDisplay = this.user.clubs.filter(club => {
            return club.name.toLowerCase().startsWith(this.searchClub.toLowerCase());
        });
    }

    onClickAddManualClub(){
        this.navCtrl.push(AddClubManualComponent);
    }

    openPopupFilter() {
        let popover = this.popOverCtrl.create(FilterClubDetailsComponent);
        popover.present();
        popover.onDidDismiss((chosenOptionsOBject) => {
            if(chosenOptionsOBject){ // only if something was chosen
                if(chosenOptionsOBject.isSales) {
                    this.chosenOption = 'sales';
                }
                else if(chosenOptionsOBject.isClubDetails) {
                    this.chosenOption = 'clubDetails'; 
                }
            }
        });
    }

    handleClubDeleted(clubToRemove){
        this.clubsManualDisplay = this.user.manuallyClubs;
    }

    refreshClubDispaly(){
        this.clubsDisplay = this.user.clubs;
        this.clubsManualDisplay = this.user.manuallyClubs;
    }
}