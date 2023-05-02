

export class User{
    constructor(
        public _id:string, 
        public fullName:string, 
        public phone:string, 
        public email:string,
        public password:string,
        public image:string,
        public nationality:string,
        public familySituation:string,
        public DateOfBirth:Date,
        public address:string,
        public department:string,
        public drivingLicense:boolean,
        public gender:string,
        public isEnabled:boolean,
        public experience:number,
        public hiringDate:Date,
        public title:string,
        public roles:string,
        
        ){}
}