export interface IUser extends UserLogin {
    fullname:string
    country:string,
    city:string,
    address:string,
    id?:string
}

export interface UserLogin {
    email?:string,
    password:string,
    cellphone?:string
}