import { Club } from './../models/club.model';
import { Injectable } from '@angular/core';
import { User } from './../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import * as environment from './../../environment.json';
import { Credit } from '../models/credit.model';

// this service is the user service for users issues when we call the server
// or get/set the local (current) user

@Injectable()
export class UserService {
    private currentUser: User;
    private url: string;

    constructor(private http: Http, private storage: Storage) {
        this.url = environment[environment.RUNNING];
    }

    getUserId() {
        return this.currentUser.id;
    }

    getLocalUser() {
        return this.currentUser;
    }

    setLocalUser(user: User) {
        this.currentUser = user;
    }

    updateLocalCustomer(): Observable<User> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('customerId', this.getUserId().toString());
        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        return Observable.create(observer => {
            this.http.get(`${this.url}/api/users/`, requestOptions)
                .map(response => response.json())
                .subscribe((data) => {
                    this.setLocalUser(data);
                    this.saveLoggedInUserToStorage(data, false);
                    observer.next(true);
                    observer.complete();
                },
                err => {
                    observer.next(false);
                    observer.complete();
                });
        });
    }

    updateLocalCustomerWithoutPromise() {
        this.updateLocalCustomer()
            .subscribe(updated => console.log(updated),
            err => console.log(err));
    }

    saveLoggedInUserToStorage(data, isManager: Boolean) {
        let currentUser = {
            isManager: isManager,
            data: data
        }
        this.storage.set(environment.CURRENT_USER_KEY, currentUser);
    }

    getUserByCustomerId(customerId: number): Observable<User> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', customerId.toString());
        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        return Observable.create(observer => {
            this.http.get(`${this.url}/api/users/`, requestOptions)
                .map(response => response.json())
                .subscribe((data) => {
                    this.setLocalUser(data);
                    this.storage.set("customerDetails", data);
                    observer.next(true);
                    observer.complete();
                },
                err => {
                    console.log("error at getUserById: " + err);
                    observer.next(false);
                    observer.complete();
                });
        });
    }
    updateUser(userUpdate: any): Observable<User> {
        return this.http.post(`${this.url}/api/users/updateCustomerInfo`, {
            customerUpdate: userUpdate,
            customerId: this.getUserId()
        })
            .map(res => res.json());
    }

    getCostumerByCostumerId(customerId: number) {
        return this.http.get(`${this.url}/api/users/`, customerId)
            .map(response => response.json()),
            err => {
                console.log("error at getUserById: " + err);
            };
    }

    getIdByCostumerId(customerId: number) {
        return this.http.get(`${this.url}/api/users/getIdByCustomerId`, customerId)
            .map(response => response.json()),
            err => {
                console.log("error at getUserById: " + err);
            };
    }

    addCredit(credit: Credit): Observable<boolean> {
        return this.http.post(`${this.url}/api/users/addCredit`, {
            userId: this.getUserId(),
            credit: credit
        })
            .map(res => res.json());
    }

    deleteCredit(credit: Credit): Observable<boolean> {
        return this.http.post(`${this.url}/api/users/deleteCredit`, {
            userId: this.getUserId(),
            credit: credit
        })
            .map(res => res.json());
    }

    editCredit(credit: Credit): Observable<boolean> {
        return this.http.post(`${this.url}/api/users/editCredit`, {
            customerId: this.getUserId(),
            creditUpdate: credit
        })
            .map(res => res.json());
    }

    changePassword(currentPassword: string, newPassword: string): Observable<boolean> {
        return this.http.post(`${this.url}/api/users/changePassword`, {
            customerId: this.getUserId(),
            currentPassword: currentPassword,
            newPassword: newPassword
        })
            .map(res => res.json());
    }

    saveImg(picture: any): Observable<any> {
        return this.http.post(`${this.url}/api/users/saveImg`, {
            picture: picture
        })
            .map(res => res.json());
    }

    getUserObjectId(): Observable<any> {
        let userId = this.getLocalUser().id;
        return this.http.get(`${this.url}/api/users/getUserObjectId/${userId}`)
            .map(response => response.json());
    }
}