export class Club {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    img? : string;
    openingHours: [string, string];
    usersClub?: any[]; //todo: UserClubSchema 
    sales?: any[]; // todo: SaleSchema
    branches?: any[]; //mongoose.Schema.Types.ObjectId
    isManual: boolean;
}