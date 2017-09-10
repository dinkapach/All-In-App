import { Club } from './../models/club.model';
import { User } from './../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Credit } from './../models/credit.model';
import * as environment from './../../environment.json';
import { UserService } from './user.service';
import { ManagerService } from './manager.service';
import { Sale } from '../models/sales.model';



@Injectable()
export class ClubService {
    private url: string;

    constructor(private http : Http, private userService: UserService) {
        this.url = environment[environment.RUNNING];
        console.log(this.url);
    }

    getClubsByUserId(userId : number) : Observable<any> {
        return this.http.get(`${this.url}/api/club/user/${userId}`)
        .map(response => response.json());
    }

    getClubByClubId(clubId : number) : Observable<any> {
        return this.http.get(`${this.url}/api/club/${clubId}`)
        .map(response => response.json());
    }

    getClubByObjectId(clubId : string ) : Observable<Club> {
        return this.http.get(`${this.url}/api/club/objectid/${clubId}`)
         .map(response => response.json());
    }

    //    getClubByClubId(clubId : number) : Observable<any> {
    //     return this.http.get(`${this.url}/api/club/user/${clubId}`)
    //     .map(response => response.json());
    // }

    // getClubObjectId(clubId : number) : Observable<any> {
    //     return this.http.get(`${this.url}/api/club/${clubId}`)
    //     .map(response => response.json());
    // }


    getClubs() : Observable<Club[]> {
        return this.http.get(`${this.url}/api/club`)
        .map(res => res.json());
    }
    
    getCredits() : Observable<Credit[]> {
        return this.http.get(`${this.url}/api/club/credits`)
        .map(res => res.json());
    }

    addManualClubToCustomer(club: Club) : Observable<any> {
        return this.http.post(`${this.url}/api/club/addManualClub`, {
            user: this.userService.getLocalUser(),
            club: club
         })
        .map( res => res.json());
    }

    addClubToCustomer(club: Club) : Observable<Boolean> {
        return this.http.post(`${this.url}/api/club/addToCustomer`, {
            user: this.userService.getLocalUser(),
            club: club
        })
        .map(res => res.json());
    }

    deleteClubFromCustomer(club: Club) : Observable<any> {
        return this.http.post(`${this.url}/api/club/deleteCustomer`, {
            user: this.userService.getLocalUser(),
            club: club
        })
        .map(res => res.json());
    }
   

}