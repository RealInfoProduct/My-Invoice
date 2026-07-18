import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, query, setDoc, updateDoc, where, getDocs } from '@angular/fire/firestore';
import { PartyList, FirmList, ProductList, RegisterUser, InvoiceList, IncomeList, ExpensesList, ExpensesmasterList, EmployeeList, AttendanceList, BonusList, WithdrawalList, MachineSalaryList, BrokerList, OrderList, BrokerageList, TransPortList, RawList, CreditNoteList } from '../interface/invoice';
import { collection } from '@firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(private fService: Firestore, private authentication: Auth) { }


  /////////////////////// registerUser List ////////////////////////


  addUserList(data: RegisterUser) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'RegisterUser'), data)
  }

  getUserList() {
    let dataRef = collection(this.fService, 'RegisterUser')
    return collectionData(dataRef, { idField: 'id' })
  }


  /////////////////////// Party List Data ////////////////////////

  addParty(payload: PartyList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'PartyList'), payload)
  }

  getAllParty() {
    let dataRef = collection(this.fService, 'PartyList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteParty(deleteId: any) {
    let docRef = doc(collection(this.fService, 'PartyList'), deleteId);
    return deleteDoc(docRef)
  }

  updateParty(updateId: PartyList, payload: any) {
    let dataRef = doc(this.fService, `PartyList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// Firm List Data ////////////////////////


  addFirm(payload: FirmList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'FirmList'), payload)
  }

  getAllFirm() {
    let dataRef = collection(this.fService, 'FirmList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteFirm(deleteId: any) {
    let docRef = doc(collection(this.fService, 'FirmList'), deleteId);
    return deleteDoc(docRef)
  }

  updateFirm(updateId: FirmList, payload: any) {
    let dataRef = doc(this.fService, `FirmList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// Broker List Data ////////////////////////


  addBroker(payload: BrokerList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'BrokerList'), payload)
  }

  getAllBroker() {
    let dataRef = collection(this.fService, 'BrokerList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteBroker(deleteId: any) {
    let docRef = doc(collection(this.fService, 'BrokerList'), deleteId);
    return deleteDoc(docRef)
  }

  updateBroker(updateId: BrokerList, payload: any) {
    let dataRef = doc(this.fService, `BrokerList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// TransPort List Data ////////////////////////


  addTransPort(payload: TransPortList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'TransPortList'), payload)
  }

  getAllTransPort() {
    let dataRef = collection(this.fService, 'TransPortList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteTransPort(deleteId: any) {
    let docRef = doc(collection(this.fService, 'TransPortList'), deleteId);
    return deleteDoc(docRef)
  }

  updateTransPort(updateId: TransPortList, payload: any) {
    let dataRef = doc(this.fService, `TransPortList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// Brokerage List Data ////////////////////////


  addBrokerage(payload:BrokerageList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'BrokerageList'), payload)
  }

  getAllBrokerage() {
    let dataRef = collection(this.fService, 'BrokerageList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteBrokerage(deleteId: any) {
    let docRef = doc(collection(this.fService, 'BrokerageList'), deleteId);
    return deleteDoc(docRef)
  }

  updateBrokerage(updateId:BrokerageList, payload: any) {
    let dataRef = doc(this.fService, `BrokerageList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// Order List Data ////////////////////////


  addOrder(payload: OrderList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'OrderList'), payload)
  }

  getAllOrder() {
    let dataRef = collection(this.fService, 'OrderList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteOrder(deleteId: any) {
    let docRef = doc(collection(this.fService, 'OrderList'), deleteId);
    return deleteDoc(docRef)
  }

  updateOrder(updateId: OrderList, payload: any) {
    let dataRef = doc(this.fService, `OrderList/${updateId}`);
    return updateDoc(dataRef, payload)
  }


  /////////////////////// Product List Data ////////////////////////


  addProduct(payload: ProductList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'ProductList'), payload)
  }

  getAllProduct() {
    let dataRef = collection(this.fService, 'ProductList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteProduct(deleteId: any) {
    let docRef = doc(collection(this.fService, 'ProductList'), deleteId);
    return deleteDoc(docRef)
  }

  updateProduct(updateId: string, payload: any) {
    let dataRef = doc(this.fService, `ProductList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// Raw List Data ////////////////////////


  addRaw(payload: RawList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'RawList'), payload)
  }

  getAllRaw() {
    let dataRef = collection(this.fService, 'RawList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteRaw(deleteId: any) {
    let docRef = doc(collection(this.fService, 'RawList'), deleteId);
    return deleteDoc(docRef)
  }

  updateRaw(updateId: RawList, payload: any) {
    let dataRef = doc(this.fService, `RawList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// Bonus List Data ////////////////////////

  addBonus(payload: BonusList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'BonusList'), payload)
  }

  getAllBonus() {
    let dataRef = collection(this.fService, 'BonusList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteBonus(deleteId: any) {
    let docRef = doc(collection(this.fService, 'BonusList'), deleteId);
    return deleteDoc(docRef)
  }

  updateBonus(updateId: any, payload: any) {
    let dataRef = doc(this.fService, `BonusList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// MachineSalary List Data ////////////////////////

  addMachineSalary(payload: MachineSalaryList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'MachineSalaryList'), payload)
  }

  getAllMachineSalary() {
    let dataRef = collection(this.fService, 'MachineSalaryList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteMachineSalary(deleteId: any) {
    let docRef = doc(collection(this.fService, 'MachineSalaryList'), deleteId);
    return deleteDoc(docRef)
  }

  updateMachineSalary(updateId: MachineSalaryList, payload: any) {
    let dataRef = doc(this.fService, `MachineSalaryList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// Withdrawal List Data ////////////////////////


  addWithdrawal(payload: WithdrawalList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'WithdrawalList'), payload)
  }

  getAllWithdrawal() {
    let dataRef = collection(this.fService, 'WithdrawalList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteWithdrawal(deleteId: any) {
    let docRef = doc(collection(this.fService, 'WithdrawalList'), deleteId);
    return deleteDoc(docRef)
  }

  updateWithdrawal(updateId: any, payload: any) {
    let dataRef = doc(this.fService, `WithdrawalList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// Attendance List Data ////////////////////////


  addAttendance(payload: AttendanceList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'AttendanceList'), payload)
  }

  getAllAttendance() {
    let dataRef = collection(this.fService, 'AttendanceList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteAttendance(deleteId: any) {
    let docRef = doc(collection(this.fService, 'AttendanceList'), deleteId);
    return deleteDoc(docRef)
  }

  updateAttendance(updateId: any, payload: any) {
    let dataRef = doc(this.fService, `AttendanceList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// Employee List Data ////////////////////////


  addEmployee(payload: EmployeeList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'employeeList'), payload)
  }

  getAllEmployee() {
    let dataRef = collection(this.fService, 'employeeList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteEmployee(deleteId: any) {
    let docRef = doc(collection(this.fService, 'employeeList'), deleteId);
    return deleteDoc(docRef)
  }

  updateEmployee(updateId: EmployeeList, payload: any) {
    let dataRef = doc(this.fService, `employeeList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// Invoice List ////////////////////////


  addInvoice(data: InvoiceList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'InvoiceList'), data)
  }

  
  updateInvoice(updateId: InvoiceList, payload: any) {
    let dataRef = doc(this.fService, `InvoiceList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  deleteInvoice(deleteId: any) {
    let docRef = doc(collection(this.fService, 'InvoiceList'), deleteId);
    return deleteDoc(docRef)
  }

  getAllInvoice() {
    let dataRef = collection(this.fService, 'InvoiceList')
    return collectionData(dataRef, { idField: 'id' })
  }

  /////////////////////// Income List ////////////////////////


  addIncome(data: IncomeList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'IncomeList'), data)
  }

  getAllIncome() {
    let dataRef = collection(this.fService, 'IncomeList')
    return collectionData(dataRef, { idField: 'id' })
  }
  
  updateIncome(updateId: number, payload: any) {
    let dataRef = doc(this.fService, `IncomeList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  deleteIncome(deleteId: any) {
    let docRef = doc(collection(this.fService, 'IncomeList'), deleteId);
    return deleteDoc(docRef)
  }

  /////////////////////// Expenses List ////////////////////////


  addExpenses(data: ExpensesList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'expensesList'), data)
  }

  getAllExpenses() {
    let dataRef = collection(this.fService, 'expensesList')
    return collectionData(dataRef, { idField: 'id' })
  }
  
  updateExpenses(updateId: string, payload: any) {
    let dataRef = doc(this.fService, `expensesList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  deleteExpenses(deleteId: any) {
    let docRef = doc(collection(this.fService, 'expensesList'), deleteId);
    return deleteDoc(docRef)
  }

  /////////////////////// Expenses Master List ////////////////////////

  addExpensesmaster(data: ExpensesmasterList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'expensesmasterList'), data)
  }

  getAllExpensesmaster() {
    let dataRef = collection(this.fService, 'expensesmasterList')
    return collectionData(dataRef, { idField: 'id' })
  }

  /////////////////////// Credit Note List ////////////////////////

  addCreditNote(data: CreditNoteList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'creditNotes'), data)
  }

  updateCreditNote(updateId: string, payload: any) {
    let dataRef = doc(this.fService, `creditNotes/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  deleteCreditNote(deleteId: any) {
    let docRef = doc(collection(this.fService, 'creditNotes'), deleteId);
    return deleteDoc(docRef)
  }

  getAllCreditNote() {
    let dataRef = collection(this.fService, 'creditNotes')
    return collectionData(dataRef, { idField: 'id' })
  }

  async getLatestCreditNoteNumber(userId: string, firmId: string, accountYear: string): Promise<string> {
    const q = query(
      collection(this.fService, 'creditNotes'),
      where('userId', '==', userId),
      where('firmId', '==', firmId),
      where('accountYear', '==', accountYear)
    );
    const querySnapshot = await getDocs(q);
    let maxVal = 0;
    querySnapshot.forEach((docVal) => {
      const data = docVal.data() as any;
      if (data && data.creditNoteNumber) {
        const match = data.creditNoteNumber.match(/CN-(\d+)/);
        if (match) {
          const val = parseInt(match[1], 10);
          if (val > maxVal) {
            maxVal = val;
          }
        }
      }
    });
    const nextNum = maxVal + 1;
    return 'CN-' + String(nextNum).padStart(3, '0');
  }
}