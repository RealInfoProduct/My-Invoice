import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartyMasterComponent } from './party-master/party-master.component';
import { FirmMasterComponent } from './firm-master/firm-master.component';
import { FullComponent } from 'src/app/layouts/full/full.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { AddInvoiceComponent } from './invoice-list/add-invoice/add-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { PdfviewComponent } from './invoice-list/add-invoice/pdfview/pdfview.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { EmployeeComponent } from './employee/employee.component';
import { ReportComponent } from './report/report.component';
import { BonusComponent } from './bonus/bonus.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { MachineSalaryComponent } from './machine-salary/machine-salary.component';
import { BrokerComponent } from './broker/broker.component';
import { OrderComponent } from './order/order.component';
import { BrokerListComponent } from './broker/broker-list/broker-list.component';
import { TransPortComponent } from './trans-port/trans-port.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { CreditNoteComponent } from './credit-note/credit-note.component';
import { DebitNoteComponent } from './debit-note/debit-note.component';
import { AddCreditNoteComponent } from './credit-note/add-credit-note/add-credit-note.component';
import { CreditNotePdfViewComponent } from './credit-note/add-credit-note/pdfview/pdfview.component';


export const MasterRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'partymaster',
        component: PartyMasterComponent,
        data: {
          title: 'Party Master',
          urls: [
            { title: 'Master', url: '/master/partymaster' },
            { title: 'Party Master' },
          ],
        },
      },
      {
        path: 'firmmaster',
        component: FirmMasterComponent,
        data: {
          title: 'Firm Master',
          urls: [
            { title: 'Master', url: '/master/firmmaster' },
            { title: 'Firm Master' },
          ],
        },
      },
      {
        path: 'rawmaster',
        component: RawMaterialComponent,
        data: {
          title: 'Raw Material',
          urls: [
            { title: 'Master', url: '/master/rawmaster' },
            { title: 'Raw Material' },
          ],
        },
      },
      {
        path: 'productmaster',
        component: ProductMasterComponent,
        data: {
          title: 'Product Master',
          urls: [
            { title: 'Master', url: '/master/productmaster' },
            { title: 'Product Master' },
          ],
        },
      },
      {
        path: 'invoicelist',
        component: InvoiceListComponent,
        data: {
          title: 'Invoice List',
          urls: [
            { title: 'Master', url: '/master/invoicelist' },
            { title: 'Invoice List' },
          ],
        },
      }, 
      {
        path: 'brokermaster',
        component: BrokerComponent,
        data: {
          title: 'Broker Master',
          urls: [
            { title: 'Master', url: '/master/brokermaster' },
            { title: 'Broker Master' },
          ],
        },
      },
      {
        path: 'broketlist',
        component: BrokerListComponent,
        data: {
          title: 'Broket List',
          urls: [
            { title: 'Master', url: '/master/broketlist' },
            { title: 'Broket List' },
          ],
        },
      },
      {
        path: 'ordermaster',
        component: OrderComponent,
        data: {
          title: 'Order Master',
          urls: [
            { title: 'Master', url: '/master/ordermaster' },
            { title: 'Order Master' },
          ],
        },
      },
      {
        path: 'invoiceview',
        component: PdfviewComponent,
        data: {
          title: 'Invoice View',
          urls: [
            { title: 'Master', url: '/master/invoicelist' },
            { title: 'Invoice View' },
          ],
        },
      },
      {
        path: 'addinvoice',
        component: AddInvoiceComponent,
        data: {
          title: 'Add Invoice',
          urls: [
            { title: 'Master', url: '/master/addinvoice' },
            { title: 'Add Invoice' },
          ],
        },
      },
      {
        path: 'expenses',
        component: ExpensesComponent,
        data: {
          title: 'Expenses',
          urls: [
            { title: 'Master', url: '/master/expenses' },
            { title: 'Expenses' },
          ],
        },
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        data: {
          title: 'Employee',
          urls: [
            { title: 'Master', url: '/master/employee' },
            { title: 'Employee' },
          ],
        },
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
        data: {
          title: 'Attendance',
          urls: [
            { title: 'Master', url: '/master/attendance' },
            { title: 'Attendance' },
          ],
        },
      },
      {
        path: 'withdrawal',
        component: WithdrawalComponent,
        data: {
          title: 'Withdrawal',
          urls: [
            { title: 'Master', url: '/master/withdrawal' },
            { title: 'Withdrawal' },
          ],
        },
      },
      {
        path: 'machineSalary',
        component: MachineSalaryComponent,
        data: {
          title: 'MachineSalary',
          urls: [
            { title: 'Master', url: '/master/machineSalary' },
            { title: 'MachineSalary' },
          ],
        },
      },
      {
        path: 'debitNote',
        component: DebitNoteComponent,
        data: {
          title: 'debitNote',
          urls: [
            { title: 'Master', url: '/master/debitNote' },
            { title: 'debitNote' },
          ],
        },
      },
      {
        path: 'creditNote',
        component: CreditNoteComponent,
        data: {
          title: 'creditNote',
          urls: [
            { title: 'Master', url: '/master/creditNote' },
            { title: 'creditNote' },
          ],
        },
      },
      {
        path: 'addcreditnote',
        component: AddCreditNoteComponent,
        data: {
          title: 'Add Credit Note',
          urls: [
            { title: 'Master', url: '/master/addcreditnote' },
            { title: 'Add Credit Note' },
          ],
        },
      },
      {
        path: 'creditnoteview',
        component: CreditNotePdfViewComponent,
        data: {
          title: 'Credit Note View',
          urls: [
            { title: 'Master', url: '/master/creditNote' },
            { title: 'Credit Note View' },
          ],
        },
      },
      {
        path: 'report',
        component: ReportComponent,
        data: {
          title: 'Report',
          urls: [
            { title: 'Master', url: '/master/report' },
            { title: 'Report' },
          ],
        },
      },
      {
        path: 'bonus',
        component: BonusComponent,
        data: {
          title: 'Bonus',
          urls: [
            { title: 'Master', url: '/master/bonus' },
            { title: 'Bonus' },
          ],
        },
      },
      {
        path: 'transPort',
        component: TransPortComponent,
        data: {
          title: 'Trans Port',
          urls: [
            { title: 'Master', url: '/master/transPort' },
            { title: 'Trans Port' },
          ],
        },
      },
     
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(MasterRoutes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
