import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-amount-dialog',
  templateUrl: './amount-dialog.component.html',
  styleUrls: ['./amount-dialog.component.scss']
})
export class AmountDialogComponent  implements OnInit {
  displayedColumns: string[] = ['srNo', 'productPrice', 'totalAmount'];
  amountDataSource: any = []
  amountForm: FormGroup
  rowMaterialList :any =[]
  constructor(
    public dialogRef: MatDialogRef<AmountDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public amountdata: any,
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private _snackBar: MatSnackBar,
    private loaderService: LoaderService,
  ) {
    this.amountDataSource = amountdata.receivePayment
    amountdata['pendingAmount'] = (amountdata.finalTotal) - (amountdata.receivePayment.reduce((total: any, payment: any) => total + payment.paymentAmount, 0))
  }
  ngOnInit(): void {
    this.buildForm()

  }

  buildForm() {
    this.amountForm = this.fb.group({
      paymentDate: [new Date(), Validators.required],
      paymentAmount: [0],
    })
  }


  addPayment() {
    const paymentData = {
      paymentDate: moment(this.amountForm.value.paymentDate).format('L'),
      paymentAmount: this.amountForm.value.paymentAmount,
    }
    this.amountdata.receivePayment.push(paymentData)
    const pendingTotalAmount = (this.amountdata.finalTotal) - (this.amountdata.receivePayment.reduce((total: any, payment: any) => total + payment.paymentAmount, 0))

    // if (pendingTotalAmount === 0) {
    //   this.amountdata.isPayment = true
    // }

    if (pendingTotalAmount >= 0) {
      this.loaderService.setLoader(false)
      this.firebaseService.updateRaw(this.amountdata.id, this.amountdata).then((res: any) => {
        this.openConfigSnackBar('payment received successfully')
        this.getRowMaterialData()
        this.amountForm.controls['paymentAmount'].reset()
        this.amountdata.receivePayment = []

      }, (error) => {
        this.openConfigSnackBar(error.error.error.message)
        this.loaderService.setLoader(false)
        this.amountdata.receivePayment = []

      })

    } else {
      this.openConfigSnackBar('payments not available')
      this.getRowMaterialData()
      this.amountdata.receivePayment = []

    }
  }

  openConfigSnackBar(snackbarTitle: any) {
    this._snackBar.open(snackbarTitle, 'Splash', {
      duration: 2 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

 getRowMaterialData() {
    this.loaderService.setLoader(true)
    this.firebaseService.getAllRaw().subscribe((res: any) => {
      if (res) {
        this.rowMaterialList = res.filter((id: any) => id.userId === localStorage.getItem("userId"))
         this.amountdata = res.find((id: any) =>
          id.id === this.amountdata.id
        )

        this.amountDataSource = this.amountdata.receivePayment
        this.amountdata['pendingAmount'] = (this.amountdata.finalTotal) - (this.amountdata.receivePayment.reduce((total: any, payment: any) => total + payment.paymentAmount, 0))

        this.loaderService.setLoader(false)
      }
    })
  }
}