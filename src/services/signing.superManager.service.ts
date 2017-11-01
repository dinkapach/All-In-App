import { Observable } from 'rxjs/Observable';
import { User } from './../models/user.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as environment from './../../environment.json';

// this class provide singing services for super manager

@Injectable()
export class SigningSuperManagerService {
    private url: string;

    constructor(private http: Http, private storage: Storage) {
        // url: localhost or all-in-app.herokuapp.com get from the 'enviroment' file
        this.url = environment[environment.RUNNING]; 
    }

    loginSuperManager(email: string, password: string): Observable<any> {
        let loginSuperManagerUrl = this.getLoginSuperManagerUrl();
        return this.http.post(`${this.url}` + loginSuperManagerUrl, {
            email: email,
            password: password
        })
            .map(res => res.json());
    }

    getLoginSuperManagerUrl() {
        return environment.SUPER_MANAGER_LOGIN_URL;
    }
}