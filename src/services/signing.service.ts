import { ManagerService } from './manager.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as environment from './../../environment.json';

// this service is for singing issues

@Injectable()
export class SigningService {
    private url: string;

    constructor(private http: Http, private userService: UserService,private managerService: ManagerService, private storage: Storage) {
        this.url = environment[environment.RUNNING];
    }

    signupUser(customer: User): Observable<any> {
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
                let isManager = data.isManager;
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
        return Observable.create(observer => {
            this.http.post(`${this.url}`+loginUrl, {
                email: email,
                password: password
            }).map(response => response.json())
            .subscribe((data) =>{
                if (isManager){
                    this.managerService.setLocalManager(data.manager, data.club);
                }
                else {
                    this.userService.setLocalUser(data);
                }
                this.saveLoggedInUserToStorage(data, isManager);
                observer.next(true);
                observer.complete();
            },
            err => {
                observer.next(false);
                observer.complete();
            },
            () => {
                observer.complete();
            });
        });
    }

    saveLoggedInUserToStorage(data, isManager: Boolean){
        let currentUser = {
            isManager: isManager,
            data: data
        }
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