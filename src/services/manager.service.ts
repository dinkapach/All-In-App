import { Sale } from './../models/sales.model';
import { User } from './../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Manager } from './../models/manager.model';
import { Storage } from '@ionic/storage';
import * as environment from './../../environment.json';
import { Club } from '../models/club.model';
import { SigningService } from './signing.service';

@Injectable()
export class ManagerService {
    private url: string;
    private currentManager: Manager;
    private currentClub: Club;
    private isManager: Boolean;
    private currentCustomers;
    constructor(private http: Http, private storage: Storage) {
        this.url = environment[environment.RUNNING];
        console.log(this.url);
    }

    getLocalManager() {
        return this.currentManager;
    }

    getLocalClub() {
        return this.currentClub;
    }

    getLocalCustomers() {
        return this.currentCustomers;
    }

    getClubId() {
        return this.currentClub.id;
    }

    getLocalManagerId() {
        return this.currentManager.id;
    }

    getManagerId() {
        return this.currentManager.id;
    }

    updateLocalManager(): Observable<Manager> {
        let managerId = this.getManagerId();

        return Observable.create(observer => {
            this.http.get(`${this.url}/api/manager/${managerId}`)
                .map(response => response.json())
                .subscribe((data) => {
                    console.log("got user data from getManagerById: ");
                    console.log(data);
                    this.setLocalManager(data.manager, data.club);
                    this.saveLoggedInUserToStorage(data, true);
                    observer.next(true);
                    observer.complete();
                },
                err => {
                    console.log("error at getManagerById: " + err);
                    observer.next(false);
                    observer.complete();
                });
        });
    }

    saveLoggedInUserToStorage(data, isManager: Boolean) {
        let currentUser = {
            isManager: isManager,
            data: data
        }
        console.log("saving user to storage. key: " + environment.CURRENT_USER_KEY);
        console.log(currentUser);
        this.storage.set(environment.CURRENT_USER_KEY, currentUser);
    }

    setLocalManager(manager: Manager, club: Club) {
        console.log(manager, club);
        this.currentManager = manager;
        this.currentClub = club;
        this.currentCustomers = this.currentClub.usersClub;
        console.log(manager, club);
        console.log("current customers", this.currentCustomers);
    }

    setCustomerArray(customers: User[]) {
        this.currentCustomers = customers;
    }

    addSale(sale: Sale): Observable<Sale> {
        return this.http.post(`${this.url}/api/manager/addSale`, {
            clubId: this.getClubId(),
            sale: sale
        }).map(response => response.json())
    }

    addPointsToCustomerById(customerId: any, clubObjId: any, numOfPoints: number): Observable<any> {
        return this.http.post(`${this.url}/api/manager/addPointsToCustomerById`, {
            customerId: customerId,
            clubObjId: clubObjId,
            numOfPoints: numOfPoints
        })
            .map(res => res.json());
    }


    deleteCustomerFromClub(userObjectId: any, clubId: any): Observable<boolean> {
        return this.http.post(`${this.url}/api/manager/deleteCustomer`, {
            userObjectId: userObjectId,
            clubId: clubId
        })
            .map(res => res.json());
    }

    subscribePointsToCustomerById(customerId: any, clubObjId: any, numOfPoints: number): Observable<any> {
        return this.http.post(`${this.url}/api/manager/subscribePointsToCustomerById`, {
            customerId: customerId,
            clubObjId: clubObjId,
            numOfPoints: numOfPoints

        }).map(res => res.json())
    }

    getCustomerDetails(customerId: number) {
        return this.http.get(`${this.url}/api/manager/getCustomerDetails/${customerId}`)
            .map(res => res.json());
    }

    deleteSale(saleId: Number): Observable<boolean> {
        return this.http.post(`${this.url}/api/club/deleteSale`, {
            saleId: saleId,
            clubId: this.getClubId()
        })
            .map(res => res.json());
    }

    updateManager(managerUpdate: any): Observable<boolean> {
        console.log("updating manager: " + this.getLocalManagerId());
        console.log("updating manager: " + managerUpdate);
        return this.http.post(`${this.url}/api/manager/updateManagerInfo`, {
            managerUpdate: managerUpdate,
            managerId: this.getLocalManagerId()
        })
            .map(res => res.json());
    }

    editSale(sale: Sale): Observable<boolean> {
        console.log('service edit sale :' + this.getClubId());
        return this.http.post(`${this.url}/api/manager/editSale`, {
            clubId: this.getClubId(),
            saleUpdate: sale
        })
            .map(res => res.json());
    }

    updateClub(clubUpdate: any): Observable<boolean> {
        console.log("updating club: ", clubUpdate);
        return this.http.post(`${this.url}/api/manager/updateClubInfo`, {
            clubUpdate: clubUpdate,
            clubId: this.getClubId()
        })
            .map(res => res.json());
    }

    changePassword(currentPassword: string, newPassword: string): Observable<boolean> {
        console.log("change password service ");
        return this.http.post(`${this.url}/api/manager/changePassword`, {
            managerId: this.getLocalManagerId(),
            currentPassword: currentPassword,
            newPassword: newPassword
        })
            .map(res => res.json());
    }
}