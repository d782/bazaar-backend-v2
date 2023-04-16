import { UserLogin } from "./user.interface";

export class Login {
    email:string;
    password:string;
    cellphone:string;

    constructor({email,password,cellphone}:UserLogin){
        this.email=email;
        this.password=password;
        this.cellphone=cellphone;
    }
}