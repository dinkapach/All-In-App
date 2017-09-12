import { ClubManually } from './clubManually.model';
import { Club } from './club.model';

export class User {
    id: number;
    userName:string;
    firstName: string;
    lastName: string;
    password: string;
    address: string;
    email: string;
    age?: number;
    phoneNumber?: string;
    img? : string;
    birthday: string;
    clubs?: any[]; 
    credits?: any[]; 
    receipts?: any[];
    manuallyClubs?: ClubManually[];
    joinDate?: Date;
}
