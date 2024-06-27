
interface UserData{
    id:number;
    username:string;
    email:string;
}


export class User{
    constructor(
        public token:string,
        public user:UserData
    ){}
}


export class FormAuth{
    constructor(
        public username:string,
        public password:string,
        public email?:string
    ){}
}