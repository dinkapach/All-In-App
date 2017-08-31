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
    clubs?: any[]; //TODO: mongoose.Schema.Types.ObjectId
    credits?: any[]; //CreditSchema
    receipts?: any[]; //ReceiptSchema
    manuallyClubs?: ClubManually[];
    // constructor(id: number, userName:string, firstName: string, lastName: string, 
    //     password: string, address: string, email: string, phoneNumber: string, birthday: string){
    //         this. id = id;
    //         this.userName = userName;
    //         this.firstName = firstName;
    //         this.lastName = lastName;
    //         this.password = password;
    //         this.address = address;
    //         this.email = email;
    //         this.phoneNumber = phoneNumber;
    //         this.birthday = birthday;
    // }
}
