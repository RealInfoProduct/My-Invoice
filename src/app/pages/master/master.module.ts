import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutes, MasterRoutingModule } from './master-routing.module';
import { PartyMasterComponent, partyMasterDialogComponent } from './party-master/party-master.component';
import { FirmMasterComponent, firmMasterDialogComponent } from './firm-master/firm-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { ProductMasterComponent, productMasterDialogComponent} from './product-master/product-master.component';
import { AddInvoiceComponent } from './invoice-list/add-invoice/add-invoice.component';
import { InvoiceListComponent, amountlistdialog, productdialog} from './invoice-list/invoice-list.component';
import { PdfviewComponent } from './invoice-list/add-invoice/pdfview/pdfview.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ExpensesDialogComponent } from './expenses/expenses-dialog/expenses-dialog.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { EmployeeComponent } from './employee/employee.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { EmployeeDialogComponent } from './employee/employee-dialog/employee-dialog.component';
import { AttendanceDialogComponent } from './attendance/attendance-dialog/attendance-dialog.component';
import { ReportComponent } from './report/report.component';
import { BonusComponent } from './bonus/bonus.component';
import { BonusDialogComponent } from './bonus/bonus-dialog/bonus-dialog.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { WithdrawalDialogComponent } from './withdrawal/withdrawal-dialog/withdrawal-dialog.component';
import { MachineSalaryComponent } from './machine-salary/machine-salary.component';
import { MachineSalaryDialogComponent } from './machine-salary/machine-salary-dialog/machine-salary-dialog.component';
import { BrokerComponent } from './broker/broker.component';
import { BrokerDialogComponent } from './broker/broker-dialog/broker-dialog.component';
import { OrderComponent } from './order/order.component';
import { OrderDialogComponent } from './order/order-dialog/order-dialog.component';
import { ViewDialogComponent } from './order/view-dialog/view-dialog.component';
import { BrokerListComponent } from './broker/broker-list/broker-list.component';
import { TransPortComponent } from './trans-port/trans-port.component';
import { TransPortDialogComponent } from './trans-port/trans-port-dialog/trans-port-dialog.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { RawMaterialDialogComponent } from './raw-material/raw-material-dialog/raw-material-dialog.component';
import { AmountDialogComponent } from './raw-material/amount-dialog/amount-dialog.component';
import { CreditNoteComponent } from './credit-note/credit-note.component';
import { DebitNoteComponent } from './debit-note/debit-note.component';
import { CreditNoteDialogComponent } from './credit-note/credit-note-dialog/credit-note-dialog.component';
import { DebitNoteDialogComponent } from './debit-note/debit-note-dialog/debit-note-dialog.component';
import { AddCreditNoteComponent } from './credit-note/add-credit-note/add-credit-note.component';
import { CreditNotePdfViewComponent } from './credit-note/add-credit-note/pdfview/pdfview.component';


@NgModule({
  declarations: [
    PartyMasterComponent,
    FirmMasterComponent,
    partyMasterDialogComponent,
    firmMasterDialogComponent,
    ProductMasterComponent,
    productMasterDialogComponent,
    InvoiceListComponent,
    AddInvoiceComponent,
    PdfviewComponent,
    productdialog,
    amountlistdialog,
    ExpensesComponent,
    ExpensesDialogComponent,
    EmployeeComponent,
    AttendanceComponent,
    EmployeeDialogComponent,
    AttendanceDialogComponent,
    ReportComponent,
    BonusComponent,
    BonusDialogComponent,
    WithdrawalComponent,
    WithdrawalDialogComponent,
    MachineSalaryComponent,
    MachineSalaryDialogComponent,
    BrokerComponent,
    BrokerDialogComponent,
    OrderComponent,
    OrderDialogComponent,
    ViewDialogComponent,
    BrokerListComponent,
    TransPortComponent,
    TransPortDialogComponent,
    RawMaterialComponent,
    RawMaterialDialogComponent,
    AmountDialogComponent,
    CreditNoteComponent,
    DebitNoteComponent,
    CreditNoteDialogComponent,
    DebitNoteDialogComponent,
    AddCreditNoteComponent,
    CreditNotePdfViewComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    RouterModule.forChild(MasterRoutes),
    MaterialModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    TablerIconsModule,
    MatNativeDateModule,
    NgApexchartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class MasterModule { }
