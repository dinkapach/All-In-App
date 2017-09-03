import { ManagerService } from './manager.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as environment from './../../environment.json';

@Injectable()
export class SigningService {
    private url: string;

    constructor(private http: Http, private userService: UserService,private managerService: ManagerService, private storage: Storage) {
        this.url = environment[environment.RUNNING];
        console.log(this.url);
    }

    signupUser(customer: User): Observable<any> {
        console.log(customer);
        return this.http.post(`${this.url}/api/users/signup`, {
            customer: customer
        })
        .map(response => response.json());
    }

    loadUserFromStorage(): Observable<any> {
        let currentUserKey = environment.CURRENT_USER_KEY;
        return Observable.create(observer => {
        this.storage.get(currentUserKey).then((data) => {
            if (data != null){
                console.log("in isLoggedIn method");
                let isManager = data.isManager;
                // console.log("is manager: " ,isManager);
                console.log(data);
                if(isManager){
                    this.managerService.setLocalManager(data.data.manager, data.data.club);
                }
                else{
                    this.userService.setLocalUser(data.data);
                }
                observer.next({
                    isManager: isManager
                });
            }
            else{
                observer.error("user not in storage");
            }
            observer.complete();
        })
        .catch(err => observer.error(err));
    });
    }

    // getUserKey(isManager){
    //     if (isManager){
    //         return environment.MANAGER_STORAGE_KEY;
    //     }
    //     else{
    //         return environment.CUSTOMER_STORAGE_KEY;
    //     }
    // }

    logoutUser(): Observable<Boolean> {
        return Observable.create(observer => {
            this.storage.remove(environment.CURRENT_USER_KEY).then((isAuth) => {
                observer.next(true);
                observer.complete();
            });
        });
    }


    loginUser(email: string, password: string, isManager: boolean): Observable<Boolean> {
        let loginUrl = this.getLoginUrl(isManager);
        console.log("is manager: " + isManager);
        console.log(`${this.url}`+loginUrl);
        return Observable.create(observer => {
            this.http.post(`${this.url}`+loginUrl, {
                email: email,
                password: password
            }).map(response => response.json())
            .subscribe((data) =>{
                console.log("got user data from login: ");
                console.log(data);
                if (isManager){
                    // console.log("set manager in storage");
                    this.managerService.setLocalManager(data.manager, data.club);
                }
                else {
                    // console.log("set customer in storage");
                    this.userService.setLocalUser(data);
                }
                this.saveLoggedInUserToStorage(data, isManager);
                observer.next(true);
                observer.complete();
            },
            err => {
                console.log("error at login service");
                observer.next(false);
                observer.complete();
            },
            () => {
                console.log("complete observer");
                observer.complete();
            });
        });
    }

    saveLoggedInUserToStorage(data, isManager: Boolean){
        let currentUser = {
            isManager: isManager,
            data: data
        }
        console.log("saving user to storage");
        console.log(currentUser);
        this.storage.set(environment.CURRENT_USER_KEY, currentUser);
    }

    getLoginUrl(isManager: Boolean){
        if (isManager){
            return environment.MANAGER_LOGIN_URL;
        }
        else{
            return environment.CUSTOMER_LOGIN_URL;
        }
    }
}