export interface CommonBill {
    year: number,       //1990 <= year <= 2022
    month: number,      //1 <= month <= 12
    units: number,      //0 <= units <= 100000
    penalty: number,    //0 <= penalty <= 100000
    total: number,      //0 <= total <= 100000
    isPaid: boolean,   //true or false
    paymentDate: number | "Not Yet",
    paymentMethod: "Cash" | "Card" | "Wallet" | "Not Yet",
    id: string,
}


//validation common
//all fields are required

export let billsCategories: string[] = ['Water', 'Electricity', 'Telephone']
