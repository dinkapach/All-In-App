import { Sale } from './../models/sales.model';
import { ClubManually } from './../models/clubManually.model';
import { Manager } from './../models/manager.model';
import { Club } from './../models/club.model';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';


@Injectable()
export class CloneService {

    constructor() {

    }

    getDeepCopyOfClub(club: Club) {
        let copyOfClub: Club = new Club();
        copyOfClub.id = club.id;
        copyOfClub.name = club.name;
        copyOfClub.address = club.address;
        copyOfClub.openingHours = club.openingHours;
        copyOfClub.phoneNumber = club.phoneNumber;

        return copyOfClub;
    }

    getDeepCopyOfManager(manager: Manager) {
        let copyOfManager: Manager = new Manager();
        copyOfManager.id = manager.id;
        copyOfManager.clubId = manager.clubId;
        copyOfManager.firstName = manager.firstName;
        copyOfManager.lastName = manager.lastName;
        copyOfManager.email = manager.email;
        copyOfManager.permissions = manager.permissions;
        copyOfManager.password = manager.password;
        copyOfManager.userName = manager.userName;

        return copyOfManager;
    }

    getDeepCopyOfClubManually(club: ClubManually){
        let copyOfClubManual: ClubManually = new ClubManually();
        copyOfClubManual.id = club.id;
        copyOfClubManual.name = club.name;
        copyOfClubManual.address = club.address;
        copyOfClubManual.phoneNumber = club.phoneNumber;
        copyOfClubManual.points = club.points;
        copyOfClubManual.img = club.img;
        copyOfClubManual.isManual = club.isManual;

        return copyOfClubManual;
    }

    getDeepCopyOfSale(sale: Sale) {
        let copyOfSale: Sale = new Sale();
        copyOfSale.id = sale.id;
        copyOfSale.name = sale.name;
        copyOfSale.points = sale.points;
        copyOfSale.img = sale.img;
        copyOfSale.description = sale.description;
        copyOfSale.price =  sale.price;

        return copyOfSale;
    }







}