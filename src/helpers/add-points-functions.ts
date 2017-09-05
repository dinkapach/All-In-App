import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class AddPointsFunctions {


    constructor() {
    }

    calculatePointsAmountByGivenPercent(totalAmount: number, percent: number) {
        let pointsToAdd = totalAmount * (percent/100); 
        return pointsToAdd;
    }



}