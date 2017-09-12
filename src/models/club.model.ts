export class Club {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    img? : string;
    openingHours: [string, string];
    usersClub?: any[];  
    sales?: any[];
    branches?: any[]; 
    isManual: boolean;
}