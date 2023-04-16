import { IUser } from "./user.interface";

export class GeneralUser {
    fullname:string
    country:string
    city:string
    address:string
    id:string
    email:string
    password:string
    cellphone:string
    constructor({
        fullname,
        country,
        city,
        address,
        id,
        email,
        password,
        cellphone
    }:IUser){
        this.fullname=fullname;
        this.country=country;
        this.city=city;
        this.address=address;
        this.id=id;
        this.email=email;
        this.password=password;
        this.cellphone=cellphone;
    }
}