import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-note-dialog',
  templateUrl: './credit-note-dialog.component.html',
  styleUrls: ['./credit-note-dialog.component.scss']
})
export class CreditNoteDialogComponent implements OnInit {
  displayedColumns: string[] = ['poNumber', 'productName', 'HSNCode', 'price', 'qty', 'finalAmount'];
  productDataSource: any[] = [];
  action: string = '';
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<CreditNoteDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      if (data.action === 'Delete') {
        this.local_data = { ...data };
        this.action = data.action;
      } else {
        this.productDataSource = Array.isArray(data) ? data : [data];
      }
    }
  }

  ngOnInit(): void {}

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
