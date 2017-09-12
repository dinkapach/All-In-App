import { ClubManually } from './../../../models/clubManually.model';
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
import { ClubDetailsComponent } from './../../clubs/club-details/club.details.component';
import { ClubsListComponent } from './../../clubs/clubs-list/clubs.list.component';
import { FilterClubDetailsComponent } from './filter-club.component';
import { Club } from './../../../models/club.model';
import { ClubService } from './../../../services/club.service';
import { UserService } from './../../../services/user.service';
import { EditProfileComponent } from './../edit-profile/edit-profile.component';
import { AddClubManualComponent } from './../../clubs/manualClubs/club-add-manual/club.add.manual.component';
import { User } from './../../../models/user.model';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import 'rxjs/add/operator/map';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
import { LoginComponent } from '../login/login.component';
import { CustomerSettingsComponent } from '../customer-settings/customer-settings.component';
import { SigningService } from '../../../services/signing.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.html'
}) // the dashboard component for user, the one that present his clubs, and options (like edit prfile, logout, etc.)
export class DashboardComponent implements OnInit {
    user: User;
    clubsDisplay: Club[];
    clubsManualDisplay: ClubManually[];
    searchClub: string;
    grid: Array<Array<Club>>;
    editProfilePage = EditProfileComponent;
    chosenOption: string;
    barcodeData: any;
    showClubSearchBar: Boolean = false;
    @ViewChild('clubSearchBar') clubSearchBar;

    constructor(private navParams: NavParams, private userService: UserService,
        private clubService: ClubService, private loader: LoadingController,
        private modalCtrl: ModalController, private navCtrl: NavController,
        private popOverCtrl: PopoverController, private storage: Storage,
        private signService: SigningService, private barcodeScanner: BarcodeScanner) {
        this.searchClub = '';
    }

    // when component is init, get current user and init his clubs in array to dispaly
    ngOnInit() {
        console.log("getting customer from service:")
        this.user = this.userService.getLocalUser();
        this.clubsDisplay = this.user.clubs;
        this.clubsManualDisplay = this.user.manuallyClubs;
    }

    onClearClubSearchBar() {
        this.showClubSearchBar = !this.showClubSearchBar
    }

    onClickSearchButton() {
        this.clubSearchBar.setFocus();
        this.showClubSearchBar = !this.showClubSearchBar
    }

    // fetch update data of user from DB (include his clubs and etc.)
    fetchDataFromService() {
        this.user = this.userService.getLocalUser();
        this.refreshClubDispaly()
    }

    // when the user do refresh (pull down the screen), get the update user from DB  
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.userService.updateLocalCustomer()
            .subscribe(isAuth => {
                if (isAuth) {
                    this.fetchDataFromService();
                }
                else {
                    console.log('user not connected not auth');
                }
            },
            err => {
                console.log(err);
            },
            () => {
                refresher.complete();
            });
    }

    // when click add club, open the QR scanner to scan QR code
    onClickAddClubByScanQR() {
        this.barcodeScanner.scan().then((barcodeData) => {
            this.barcodeData = barcodeData;
            if (this.barcodeData.cancelled == 0) {
                let clubObjId = this.barcodeData.text; // the QR code data is the club object id (mongo uniq id)
                this.clubService.getClubByObjectId(clubObjId) // get the ckub from DB
                    .subscribe(clubRes => {
                        if (clubRes) {
                            this.addClubToCustomer(clubRes); // add the club to customer
                        }
                        else {
                            alert("club wasnt save")
                        }
                    })
            }
        }, (err) => {
            console.log(err);
        });

    }

    // this option was when we added the club by choose it from list, before we had the QR code functionality
    // we remove this option but it's still here in case we want fast access to add club (debug using and etc.)
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
                if (club.id == clubChosen.id) {
                    isExists = true;
                }
            })
            if (!isExists) {  //add club only if its new club
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

    // open the settings component (that have the option to edit profile/ change password/ logout)
    onClickSettings() {
        this.navCtrl.push(CustomerSettingsComponent);
    }

    // serch for club in the search bar when typing club name
    searchClubs() {
        this.clubsDisplay = this.user.clubs.filter(club => {
            return club.name.toLowerCase().startsWith(this.searchClub.toLowerCase());
        });
    }

    // when the user choose to add club manually, open the relevant component
    onClickAddManualClub() {
        this.navCtrl.push(AddClubManualComponent);
    }

    // we download this option, but its here if we would like to return this option
    // when the user pick option it'll present the option as details on every club card
    openPopupFilter() {
        let popover = this.popOverCtrl.create(FilterClubDetailsComponent);
        popover.present();
        popover.onDidDismiss((chosenOptionsOBject) => {
            if (chosenOptionsOBject) { // only if something was chosen
                if (chosenOptionsOBject.isSales) {
                    this.chosenOption = 'sales';
                }
                else if (chosenOptionsOBject.isClubDetails) {
                    this.chosenOption = 'clubDetails';
                }
            }
        });
    }

    // when delete manual club, the component that deleted the club emit the event that club delted
    // so this component would remove the club from display 
    handleClubDeleted(clubToRemove) {
        this.clubsManualDisplay = this.user.manuallyClubs;
    }

    refreshClubDispaly() {
        this.clubsDisplay = this.user.clubs;
        this.clubsManualDisplay = this.user.manuallyClubs;
    }
}