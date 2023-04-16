import { Login } from "../models/login";

export interface LoginStrategy {
    execute(login:Login)
}

export class LoginWithEmail implements LoginStrategy {
    execute(email: Login) {
        return {email:email.email};
    }
}

export class LoginWithTelephone implements LoginStrategy {
    execute(email: Login) {
        return {cellphone:email.cellphone};
    }
}

export class LoginContext {
    private loginStrategy:LoginStrategy;

    setStrategy(strategy:LoginStrategy){
        this.loginStrategy=strategy;
    }

    executeStrategy(email:Login){
        return this.loginStrategy.execute(email);
    }
}