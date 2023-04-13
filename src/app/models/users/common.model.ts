export interface Common {
    id: string, //auto generated
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    address: Address
}

export interface Address {
    street: string,
    buildingNum: number,
    city: string,
    country: string
}
