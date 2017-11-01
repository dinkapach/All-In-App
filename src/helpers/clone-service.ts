import { Sale } from './../models/sales.model';
import { ClubManually } from './../models/clubManually.model';
import { Manager } from './../models/manager.model';
import { Club } from './../models/club.model';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { User } from '../models/user.model';
import { Credit } from '../models/credit.model';

// the clone service provide us deep copy of objects, like sales, cutomer, club, etc.

@Injectable()
export class CloneService {

    constructor() {
    }

    getDeepCopyOfClub(club: Club) {
        let copyOfClub: Club = new Club();
        this.cloneObject(club, copyOfClub);

        return copyOfClub;
    }

    getDeepCopyOfCustomer(customer: User) {
        let copyOfCustomer: User = new User();
        this.cloneObject(customer, copyOfCustomer);

        return copyOfCustomer;
    }

    public cloneObject(from, to){
        Object.keys(from).forEach(key => {
            to[key] = from[key];
        });
    }

    getDeepCopyOfManager(manager: Manager) {
        let copyOfManager: Manager = new Manager();
        this.cloneObject(manager, copyOfManager);

        return copyOfManager;
    }

    getDeepCopyOfSale(sale: Sale) {
        let copyOfSale: Sale = new Sale();
        this.cloneObject(sale, copyOfSale);

        return copyOfSale;
    }

    getDeepCopyOfClubManually(club: ClubManually){
        let copyOfClubManual: ClubManually = new ClubManually();
        this.cloneObject(club, copyOfClubManual);
        return copyOfClubManual;
    }


    getDeepCopyOfCredit(credit: Credit) {
        let copyOfCredit: Credit = new Credit();
        this.cloneObject(credit, copyOfCredit);

        return copyOfCredit;
    }

}