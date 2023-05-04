export interface CommonUser {
    id: string, //auto generated
    name: string,   //required
    email: string,  //required
    phoneNumber: string,    //required
    password: string,       //required
    address: Address | null   //not required
}

export interface Address {
    street: string,
    buildingNum: number,
    city: string,
    country: string
}

export enum UserType {
    User,
    Admin,
    ServiceProvider
}

type RadioButtonVals = {
    value: UserType,
    name: string
}

export const userTypes: RadioButtonVals[] = [
    {
        value: UserType.User,
        name: "User",
    },
    {
        value: UserType.Admin,
        name: "Admin",
    },
    {
        value: UserType.ServiceProvider,
        name: "Service Provider",
    }
]