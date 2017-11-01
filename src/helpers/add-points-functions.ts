import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// this class prived us functions to calculate the points the manager need to add to customer
// the goal is to create here a lot of functions to calculate the points, by the clubs roles

@Injectable()
export class AddPointsFunctions {

    constructor() {
    }

    // this function get a number (in our case is the amount of the buy)
    // and also get how mach percent to calculate
    calculatePointsAmountByGivenPercent(totalAmount: number, percent: number) {
        let pointsToAdd = totalAmount * (percent/100); 
        return pointsToAdd;
    }



}