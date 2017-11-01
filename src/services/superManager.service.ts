import { User } from './../models/user.model';
import { Club } from './../models/club.model';
import { Manager } from './../models/manager.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import * as environment from './../../environment.json';

@Injectable()
export class SuperManagerService {
    private url: string;

    constructor(private http: Http, private storage: Storage) {
        this.url = environment[environment.RUNNING];
    }

    // below is calls to server with manager issues
    ////////////////////// Managers ////////////////////////////////////////////

    getManagersArr(): Observable<any> {
        return this.http.get(`${this.url}/api/supermanager/managerArr`)
            .map(response => response.json())
    }

    createManager(newManager: Manager): Observable<boolean> {
        return this.http.post(`${this.url}/api/supermanager/addManager`, {
            newManager: newManager
        })
            .map(res => res.json());
    }

    deleteManagerWithClub(managerId: number, clubId: object): Observable<boolean> {
        return this.http.post(`${this.url}/api/supermanager/deleteManagerWithClub`, {
            managerId: managerId,
            clubId: clubId
        })
            .map(res => res.json());
    }

    deleteManagerWithoutClub(managerId: number): Observable<boolean> {
        return this.http.post(`${this.url}/api/supermanager/deleteManagerWithoutClub`, {
            managerId: managerId
        })
            .map(res => res.json());
    }

    replaceManaerForClubAndDeleteManager(newManagerOfClubId: number, managerToRemove: number, clubId: object): Observable<boolean> {
        return this.http.post(`${this.url}/api/supermanager/deleteManagerReplaceManagment`, {
            newManagerOfClubId: newManagerOfClubId,
            managerToRemove: managerToRemove,
            clubId: clubId
        })
            .map(res => res.json());
    }

    addExistingClubToManager(managerId: number, clubId: string): Observable<boolean> {
        return this.http.post(`${this.url}/api/supermanager/addExistingClubToManager`, {
            managerId: managerId,
            clubId: clubId
        })
            .map(res => res.json());
    }

    updateManager(manager: Manager): Observable<boolean> {
        return this.http.post(`${this.url}/api/supermanager/updateManager`, {
            manager: manager,
        })
            .map(res => res.json());
    }

    // below is calls to server with clubs issues
    ////////////////////// CLUBS ////////////////////////////////////////////

    getClubsArr(): Observable<any> {
        return this.http.get(`${this.url}/api/supermanager/clubArr`)
            .map(response => response.json())
    }

    createClubAndAddToManager(newClub: Club, managerId: number): Observable<boolean> {
        return this.http.post(`${this.url}/api/supermanager/addClub`, {
            newClub: newClub,
            managerId: managerId
        })
            .map(res => res.json());
    }

    deleteClub(club: Club): Observable<boolean> {
        return this.http.post(`${this.url}/api/supermanager/deleteClub`, {
            club: club,
        })
            .map(res => res.json());
    }

    deleteClubFromDBAndRemoveFromManager(managerId: number, club: Club): Observable<boolean> {
        return this.http.post(`${this.url}/api/supermanager/deleteClubRemoveFromManager`, {
            club: club,
            managerId: managerId
        })
            .map(res => res.json());
    }

    updateClub(club: Club): Observable<boolean> {
        return this.http.post(`${this.url}/api/supermanager/updateClub`, {
            club: club,
        })
            .map(res => res.json());
    }

    // below is calls to server with customer issues
    //////////////////////////////////// CUSTOMER ////////////////////////////////////////////////////
    
    getCustomerArr(): Observable<any> {
        return this.http.get(`${this.url}/api/supermanager/customerArr`)
            .map(response => response.json())
    }

    deleteCustomerFromDB(userId: User): Observable<boolean> {
        return this.http.post(`${this.url}/api/supermanager/deleteCustomerFromDB`, {
            userId: userId
        })
            .map(res => res.json());
    }
}