import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-raw-material-dialog',
  templateUrl: './raw-material-dialog.component.html',
  styleUrls: ['./raw-material-dialog.component.scss']
})
export class RawMaterialDialogComponent implements OnInit {

  rowMaterialForm: FormGroup;
  local_data: any;
  action: string;

  constructor(
    private fb: FormBuilder, public dialogRef: MatDialogRef<RawMaterialDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.rowMateriallist(this.action === 'Edit' ? this.local_data : undefined);
     this.calculateAmounts();
  }

  rowMateriallist(data:any) {
    this.rowMaterialForm = this.fb.group({
      name: [data ? data?.name :'', Validators.required],
      quantity: [data ? data?.quantity :'', Validators.required],
      price: [data ? data?.price :'', Validators.required],
      creditDate: [data ? this.convertTimestampToDate(data?.creditDate) : new Date()],
      sGSt:[data ? data?.sGSt :2.5],
      cGSt:[data ? data?.cGSt :2.5],
      finalTotal:[data ? data?.finalTotal :0],
      total:[data ? data?.totalAmount :0],
        isGstEnabled: [data ? data?.isGstEnabled : true],
    })
  }

   convertTimestampToDate(element: any): Date | null {
    if (element instanceof Timestamp) {
      return element.toDate();
    }
    return null;
  }

  doAction(): void {
    const payload = {
        id: this.local_data.id ? this.local_data.id : '',
      name: this.rowMaterialForm.value.name,
      quantity: this.rowMaterialForm.value.quantity,
      price: this.rowMaterialForm.value.price,
      creditDate: this.rowMaterialForm.value.creditDate,
      totalAmount: this.rowMaterialForm.value.totalAmount,
      sGSt: this.rowMaterialForm.value.sGSt,
      cGSt: this.rowMaterialForm.value.cGSt,
      finalTotal: this.rowMaterialForm.value.finalTotal,
      total: this.rowMaterialForm.value.total,
      isGstEnabled: this.rowMaterialForm.value.isGstEnabled,
    }
    this.dialogRef.close({ event: this.action, data: payload })
  }

 calculateAmounts(): void {
  this.rowMaterialForm.valueChanges.subscribe((value) => {

    const quantity = Number(value.quantity) || 0;
    const price = Number(value.price) || 0;

    // Base total
    const total = quantity * price;

    let sgst = Number(value.sGSt) || 0;
    let cgst = Number(value.cGSt) || 0;
    let finalTotal = total;

    // GST enabled hoy to GST calculate karo
    if (value.isGstEnabled) {

      const sgstAmount = (total * sgst) / 100;
      const cgstAmount = (total * cgst) / 100;

      finalTotal = total + sgstAmount + cgstAmount;

    } else {

      // GST disabled hoy to 0 set karo
      sgst = 0;
      cgst = 0;

      finalTotal = total;
    }

    this.rowMaterialForm.patchValue(
      {
        sGSt: sgst,
        cGSt: cgst,
        total: total.toFixed(2),
        finalTotal: finalTotal.toFixed(2)
      },
      { emitEvent: false }
    );
  });
}

}