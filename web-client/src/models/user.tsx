import {DomainClass} from "./core";

export class User extends DomainClass{
    username: string
    password: string

    constructor(user?: Partial<User>) {
        super(user);
        if(user){
            this.username = user.username!
            this.password = user.password!
        }
    }
}
