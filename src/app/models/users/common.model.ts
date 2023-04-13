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
