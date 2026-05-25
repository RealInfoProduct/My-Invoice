import { Component, OnInit, ViewChild } from '@angular/core';
import { RawMaterialDialogComponent } from './raw-material-dialog/raw-material-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RawList } from 'src/app/interface/invoice';
import { AmountDialogComponent } from './amount-dialog/amount-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.scss']
})
export class RawMaterialComponent implements OnInit {
 dateRawListForm: FormGroup;
  rowMaterialDataColumns: string[] = [
  '#',
  'date',
  'name',
  'quantity',
  'price',
  'totalAmount',
  'sGSt',
  'cGSt',
  'finalTotal',
  'action'
];
  rowMaterialList: any = [];

  rowDataSource = new MatTableDataSource(this.rowMaterialList);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private firebaseService: FirebaseService,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
      const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.dateRawListForm = this.fb.group({
      start: [startDate],
      end: [endDate]
    });
    this.getRowMaterialData();
  }

   filterDate() {
    if (!this.rowMaterialList) return;

    const startDate = this.dateRawListForm.value.start;
    const endDate = this.dateRawListForm.value.end;

    if (startDate && endDate) {
      // Convert to timestamps
      const startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
      // End time set to 23:59:59.999
      const endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999).getTime();

      this.rowDataSource.data = this.rowMaterialList.filter((invoice: any) => {
        if (!invoice.creditDate?.seconds) return false;
        const invoiceTime = invoice.creditDate.seconds * 1000; // Firestore timestamp to ms
        return invoiceTime >= startTime && invoiceTime <= endTime;
      });
    } else {
      this.rowDataSource.data = this.rowMaterialList;
    }
  }

  ngAfterViewInit() {
    this.rowDataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.rowDataSource.filter = filterValue.trim().toLowerCase();
  }

  getRowMaterialData() {
    this.loaderService.setLoader(true)
    this.firebaseService.getAllRaw().subscribe((res: any) => {
      if (res) {
        this.rowMaterialList = res.filter((id: any) => id.userId === localStorage.getItem("userId"))
        this.rowDataSource = new MatTableDataSource(this.rowMaterialList);
        this.rowDataSource.paginator = this.paginator;
          this.filterDate()
        this.loaderService.setLoader(false)
      }
    })
  }

  addDesign(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(RawMaterialDialogComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.event === 'Add') {
        const quantity = Number(result.data.quantity);
        const price = Number(result.data.price);

        const payload: RawList = {
          id: '',
          name: result.data.name,
          quantity: result.data.quantity,
          price: result.data.price,
          creditDate: result.data.creditDate,
          totalAmount: quantity * price,
          sGSt: result.data.sGSt,
          cGSt: result.data.cGSt,
          finalTotal: result.data.finalTotal,
          isGstEnabled: result.data.isGstEnabled,
          receivePayment:[],
          userId: localStorage.getItem("userId")
        }

        this.firebaseService.addRaw(payload).then((res) => {
          if (res) {
            this.getRowMaterialData()
            this.openConfigSnackBar('record create successfully')
          }
        }, (error) => {
          console.log("error=>", error);

        })
      }
      if (result?.event === 'Edit') {
        this.rowMaterialList.forEach((element: any) => {
          if (element.id === result.data.id) {

            const quantity = Number(result.data.quantity);
            const price = Number(result.data.price);

            const payload: RawList = {
              id: result.data.id,
              name: result.data.name,
              quantity: result.data.quantity,
              price: result.data.price,
              creditDate: result.data.creditDate,
              totalAmount: quantity * price,
               sGSt: result.data.sGSt,
               cGSt: result.data.cGSt,
               finalTotal: result.data.finalTotal,
                 isGstEnabled: result.data.isGstEnabled,
               receivePayment:element.receivePayment || [],
              userId: localStorage.getItem("userId")
            }
            this.firebaseService.updateRaw(result.data.id, payload).then((res: any) => {
              this.getRowMaterialData()
              this.openConfigSnackBar('record update successfully')
            }, (error) => {
              console.log("error => ", error);

            })
          }
        });
      }
      if (result?.event === 'Delete') {
        this.firebaseService.deleteRaw(result.data.id).then((res: any) => {
          this.getRowMaterialData()
          this.openConfigSnackBar('record delete successfully')
        }, (error) => {
          console.log("error => ", error);

        })
      }
    });
  }

  openConfigSnackBar(snackbarTitle: any) {
    this._snackBar.open(snackbarTitle, 'Splash', {
      duration: 2 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showAmountList(obj: any) {
    const dialogRef = this.dialog.open(AmountDialogComponent, { data: obj });
  }

    calculateTotalReceivedPayment(receivePayment: any[]): number {
    if (!receivePayment) return 0;
    return receivePayment.reduce((total, payment) => total + payment.paymentAmount, 0);
  }


  filedownload() {
  if (!this.rowDataSource.data || this.rowDataSource.data.length === 0) {
    this.openConfigSnackBar('No raw material data available to generate PDF.');
    return;
  }

  const doc = new jsPDF();

  const startDate = this.dateRawListForm.value.start;
  const endDate = this.dateRawListForm.value.end;

  const formattedStart = startDate
    ? new Date(startDate).toLocaleDateString('en-GB')
    : '';
  const formattedEnd = endDate
    ? new Date(endDate).toLocaleDateString('en-GB')
    : '';

  // Title
  doc.setFontSize(12);
  doc.text(`Raw Material Report: ${formattedStart} - ${formattedEnd}`, 14, 15);

  // Total Amount
  const totalAmount = this.rowDataSource.data.reduce(
    (sum: number, item: any) => sum + Number(item.finalTotal  || 0),
    0
  );

  const formattedAmount = totalAmount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  doc.text(`Total Amount: ${formattedAmount}`, 140, 15);

  // Table headers
  const headers = [
    '#',
    'Date',
    'Name',
    'Quantity',
    'Price',
    'Total Amount',
    'Given',
    'Balance'
  ];

  // Table data
  const data = this.rowDataSource.data.map((item: any, index: number) => {
    const received = this.calculateTotalReceivedPayment(item.receivePayment);
    const balance = Number(item.finalTotal  || 0) - received;

    return [
      index + 1,
      item.creditDate?.seconds
        ? new Date(item.creditDate.seconds * 1000).toLocaleDateString('en-GB')
        : '',
      item.name,
      item.quantity,
      item.price,
      item.finalTotal,
      received,
      balance
    ];
  });

  // Generate table
  (doc as any).autoTable({
    head: [headers],
    body: data,
    startY: 25,
    theme: 'grid',
    headStyles: {
      fillColor: [255, 187, 0],
      textColor: [0, 0, 0],
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 9,
      halign: 'center',
      valign: 'middle'
    }
  });

  // Save PDF
  doc.save(
    `Raw_Material_Report_${formattedStart.replace(/\//g, '-')}_to_${formattedEnd.replace(/\//g, '-')}.pdf`
  );
}



}
