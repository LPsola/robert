import {DomainClass} from "./core";
import {UserRole} from "./userRole";
import {Address} from "./address";

export class User extends DomainClass{
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    bankDetails: string
    role: UserRole
    bio: string
    rating: number
    careGiverId: string
    careReceiverId: string
    address: Address

    constructor(user?: Partial<User>) {
        super(user);
        if(user){
            this.username = user.username!
            this.password = user.password!
            this.firstName = user.firstName!
            this.lastName = user.lastName!
            this.email = user.email!
            this.phoneNumber = user.phoneNumber!
            this.bankDetails = user.bankDetails!
            this.role = user.role!
            this.bio = user.bio!
            this.rating = user.rating!
            this.careGiverId = user.careGiverId!
            this.careReceiverId = user.careReceiverId!
            this.address = user.address!
        }
    }
}
