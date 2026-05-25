
export interface AuthResponse {
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string
    registerd?:boolean
}

export interface RegisterUser {
    id:string,
    email:any,
    password: any,
    isActive :boolean
}

export interface PartyList {
    id: string,
    partyName: string,
    partyAddress: string,
    partyGstNo: string,
    partyChalanNoSeries: number,
    partyPanNo: string,
    partyMobileNo: number,
    userId :any,
    isFirm:any,
    isBroker:any,
    broerpercentage:any
}

export interface FirmList {
    id: string,
    header: string,
    subHeader: string,
    address: string,
    gstNo: string,
    // gstpercentage: number,
    panNo: string,
    mobileNo: number,
    personalMobileNo: number,
    bankName: string,
    accountholdersname: string; 
    bankIfsc: string,
    bankAccountNo: number,
    userId :any,
    isInvoiceTheme : number

}
export interface BrokerList {
    id: string,
    header: string,
    subHeader: string,
    address: string,
    gstNo: string,
    panNo: string,
    mobileNo: number,
    personalMobileNo: number,
    bankName: string,
    accountholdersname: string; 
    bankIfsc: string,
    bankAccountNo: number,
    userId :any,

}
export interface TransPortList {
    id: string,
    header: string,
    subHeader: string,
    address: string,
    mobileNo: number,
    transPortCompany:any,
    transPortId:any,
    userId :any,

}

export interface BrokerageList {
    id: string,
    party:any,
    broker:any,
    invoiceNo:any,
    pONumber:any,
    finalAmount:any,
    selectDate:any,
    brokerPercentage:any,
    status:any,
    userId :any,

}

export interface OrderList {
    id: string,
    partyName:any,
    partyOrder: any,
    orderDate:any,
    deliveryDate: any,
    products: {
        productPrice: any;
        productQuantity: any
    }[];
    userId: any,

}

export interface ProductList {
    id: string,
    productName: string,
    measurementUnits: string,
    hsnCode: any,
    userId :any
}

export interface BonusList {
    id: string,
    employee: string,
    amount: number,
    date: string,
    userId :any
}
export interface RawList {
    id: string,
    name:string,
    quantity:number,
    price:number
    creditDate:any,
    totalAmount:any,
    sGSt:any,
    cGSt:any,
    finalTotal:any,
    isGstEnabled:any,
    userId :any,
    receivePayment : any
}

export interface MachineSalaryList {
    id: string,
    employee: string,
    amount: number,
    date: string,
    userId :any
}

export interface WithdrawalList {
    id: string,
    employee: string,
    amount: number,
    date: string,
    userId :any
}

export interface AttendanceList {
    id: string,
    employee: string,
    day: string,
    date: string,
    userId :any
}

export interface EmployeeList {
    id: string,
    firstName: string,
    lastName: string,
    salary: number,
    phoneNo: number,
    bankName: string,
    bankIFSC: string,
    bankAccountNo: number,
    date:any,
    userId :any
}

export interface InvoiceList {
    id:string
    accountYear: string
    cGST: any
    date: string
    discount: number;
    invoiceNumber: number;
    sGST: number;
    firmId: any;
    partyId: any;
    TransPort: any;
    products: any;
    userId :any;
    finalSubAmount:any,
    isPayment : boolean,
    receivePayment : any
    paymentDays:number
}

export interface IncomeList {
    id: string,
    incomename:string,
    userId: any,
    creditDate: string,
    amount:number
}

export interface ExpensesList {
    id: string,
    expensesname:string,
    userId: any,
    creditDate: string,
    description:string,
    amount:number
}

export interface ExpensesmasterList{
    id:string
    type:string
}