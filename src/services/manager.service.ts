import { Sale } from './../models/sales.model';
import { User } from './../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Manager } from './../models/manager.model';
import { Storage } from '@ionic/storage';
import * as environment from './../../environment.json';

@Injectable()
export class ManagerService {
    private url: string;
    private currentManager: Manager;
    private isManager: Boolean;
    private customersArr: User[];
    constructor(private http : Http, private storage: Storage) {
        this.url = environment[environment.RUNNING];
        console.log(this.url);

    }

    getLocalManager(){
        return this.currentManager;
    }

    setLocalManager(manager: Manager){
        // this.storage.set("managerDetails", manager);
        this.currentManager = manager;
    }

    setCustomerArray(customers : User[])
    {
        this.customersArr = customers;
    }

    addSale(clubId: any, sale: Sale){
        this.http.post(`${this.url}/api/manager/addSale`, {
            clubId : clubId,
            sale: sale
        }).map(response => response.json())
        .subscribe(Sale => {
            console.log("sale" + Sale);
        })
    }

    addPointsToCustomerById(customerId: number, clubId:number, numOfPoints: number){
        this.http.post(`${this.url}/api/manager/addPointsToCustomerById`,{
            customerId : customerId,
            clubId : clubId,
            numOfPoints : numOfPoints
            
        }).map(res => res.json())
         .subscribe(function (isAuth) {
             if(isAuth) {
                console.log("Added points"); //where customer not found still print this
            }
            else {
                console.log("Not added points");
            }
        })
    }


    deleteCustomerFromClub(user: User, clubId: any) : Observable<Boolean> {
        return this.http.post(`${this.url}/api/manager/deleteCustomer`, {
            user: user,
            clubId: clubId
         })
        .map( res => res.json());
    }

    getClubId(){
        return this.currentManager.clubId;
    }

    subscribePointsToCustomerById(customerId: number, clubId:number, numOfPoints: number){
        this.http.post(`${this.url}/api/manager/subscribePointsToCustomerById`,{
            customerId : customerId,
            clubId : clubId,
            numOfPoints : numOfPoints
            
        }).map(res => res.json())
         .subscribe(function (isAuth) {
             if(isAuth) {
                console.log("decreased  points");
            }
            else {
                console.log("Not decreased points");
            }
        })
    }

    getCustomerDetails(customerId: number){
        return this.http.get(`${this.url}/api/manager/getCustomerDetails/${customerId}`)
        .map(res => res.json());
    }

     editSale(sale: Sale): Observable<boolean> {
         console.log ('service edit sale :' + this.getClubId());
        return this.http.post(`${this.url}/api/manager/editSale`, {
            clubId: this.getClubId(),
            saleUpdate: sale
         })
        .map( res => res.json());
    }

    getCustomersArr(clubId: number){
         return this.http.get(`${this.url}/api/manager/getCustomers/${clubId}`)
         .map(res => res.json());
     }
   

}