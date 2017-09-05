import { Club } from './../models/club.model';
import { Injectable } from '@angular/core';
import { User } from './../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';

import * as environment from './../../environment.json';
//import * as environment from './../../environment.json';
import { Credit } from '../models/credit.model';

@Injectable()
export class UserService {
    private currentUser: User;
    private url: string;

    constructor(private http : Http, private storage: Storage) {
        this.url = environment[environment.RUNNING];
        console.log(this.url);
    }

    getUserId(){
        return this.currentUser.id;
    }

    getLocalUser(){
        return this.currentUser;
    }

    setLocalUser(user: User){
        // this.storage.set("customerDetails", user);
        this.currentUser = user;
    }

    updateLocalCustomer() : Observable<User> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('customerId', this.getUserId().toString());
        let requestOptions = new RequestOptions();
        requestOptions.search = params;
        console.log("in func get user by cust id " + this.getUserId());
        

        return Observable.create(observer => {
            this.http.get(`${this.url}/api/users/`, requestOptions)
            .map(response => response.json())
            .subscribe((data) =>{
                console.log("got user data from getUserById: ");
                console.log(data);
                this.setLocalUser(data);
                this.saveLoggedInUserToStorage(data, false);
                // this.storage.set("customerDetails", data);
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

    saveLoggedInUserToStorage(data, isManager: Boolean){
        let currentUser = {
            isManager: isManager,
            data: data
        }
        console.log("saving user to storage. key: " + environment.CURRENT_USER_KEY);
        console.log(currentUser);
        this.storage.set(environment.CURRENT_USER_KEY, currentUser);
    }


    getUserByCustomerId(customerId : number) : Observable<User> {

        let params: URLSearchParams = new URLSearchParams();
        params.set('id', customerId.toString());
        let requestOptions = new RequestOptions();
        requestOptions.search = params;
        console.log("in func get user by cust id " + customerId);
        
        return Observable.create(observer => {
            this.http.get(`${this.url}/api/users/`, requestOptions)
            .map(response => response.json())
            .subscribe((data) =>{
                console.log("got user data from getUserById: ");
                console.log(data);
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
    updateUser(userUpdate : any) : Observable<User> {
        console.log("updating customer: " + userUpdate);
        return this.http.post(`${this.url}/api/users/updateCustomerInfo`, { 
            customerUpdate: userUpdate,
            customerId: this.getUserId()
         })
        .map( res => res.json());
    }

    getCostumerByCostumerId(customerId : number){
        console.log("get customer from repository..."+ customerId);
        return this.http.get(`${this.url}/api/users/`, customerId)
            .map(response => response.json()),
        err => {
            console.log("error at getUserById: " + err);           
        };
    }  

     getIdByCostumerId(customerId : number){
        console.log("get customer from repository..."+ customerId);
        return this.http.get(`${this.url}/api/users/getIdByCustomerId`, customerId)
            .map(response => response.json()),
        err => {
            console.log("error at getUserById: " + err);           
        };
    } 

    addCredit(credit: Credit): Observable<boolean> {
        console.log("adding credit 6");
        return this.http.post(`${this.url}/api/users/addCredit`, {
            userId: this.getUserId(),
            credit: credit
         })
        .map( res => res.json());
    }

    deleteCredit(credit: Credit): Observable<boolean> {
        return this.http.post(`${this.url}/api/users/deleteCredit`, {
            userId: this.getUserId(),
            credit: credit
         })
        .map( res => res.json());
    }

    

    editCredit(credit: Credit): Observable<boolean> {
        console.log('edit credit :' + this.getUserId());
        return this.http.post(`${this.url}/api/users/editCredit`, {
            customerId: this.getUserId(),
            creditUpdate: credit
         })
        .map( res => res.json());
    }

    // saveReceipt(user: User, picture: any, club: Club, isManual: boolean): Observable<any> {
    //     return this.http.post(`${this.url}/api/users/saveReceipt`, {
    //         user: user,
    //         picture: picture,
    //         club : club,
    //         isManual : isManual
    //     })
    //     .map( res => res.json());
    // }

    
    changePassword(currentPassword: string, newPassword: string): Observable<boolean> {
    // return Observable.create(observer => {
        return this.http.post(`${this.url}/api/users/changePassword`, {
            customerId: this.getUserId(),
            currentPassword: currentPassword,
            newPassword: newPassword
            })
        .map( res => res.json());
    // });
    }
    
    saveImg(picture: any): Observable<any> {
        return this.http.post(`${this.url}/api/users/saveImg`, {
            picture: picture
        })
        .map( res => res.json());
    }

    getUserObjectId() : Observable<any>{
        let userId = this.getLocalUser().id;
        return this.http.get(`${this.url}/api/users/getUserObjectId/${userId}`)
            .map(response => response.json());
    } 
}