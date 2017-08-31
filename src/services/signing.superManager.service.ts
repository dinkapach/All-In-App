import { Observable } from 'rxjs/Observable';
import { User } from './../models/user.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as environment from './../../environment.json';

@Injectable()
export class SigningSuperManagerService {
    private url: string;

    constructor(private http: Http, private storage: Storage) {
        this.url = environment[environment.RUNNING];
        console.log(this.url);
    }

    logoutUser(): Observable<Boolean> {
        return Observable.create(observer => {
            this.storage.remove(environment.CURRENT_USER_KEY).then((isAuth) => {
                observer.next(true);
                observer.complete();
            });
        });
    }

    loginSuperManager(email: string, password: string): Observable<any>  {
        let loginSuperManagerUrl = this.getLoginSuperManagerUrl();
        console.log(`${this.url}`+loginSuperManagerUrl);
        return this.http.post(`${this.url}`+loginSuperManagerUrl, {
            email: email,
            password: password
        })
        .map( res => res.json());
    }   

    getLoginSuperManagerUrl(){
        return environment.SUPER_MANAGER_LOGIN_URL;
    }
}