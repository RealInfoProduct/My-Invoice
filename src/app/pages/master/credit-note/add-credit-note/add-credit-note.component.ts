import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoaderService } from 'src/app/services/loader.service';

export interface CreditNoteProductData {
  id: number;
  product: any;
  measurementUnits: string;
  HSNCode: string;
  poNumber: string;
  qty: number;
  price: number;
  finalAmount: number;
}

@Component({
  selector: 'app-add-credit-note',
  templateUrl: './add-credit-note.component.html',
  styleUrls: ['./add-credit-note.component.scss']
})
export class AddCreditNoteComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  creditNoteForm: FormGroup;
  editMode = false;
  nextId = 1;
  currentEditId: number;
  currentEditIndex: number;

  partyList: any[] = [];
  invoiceList: any[] = [];
  filteredInvoiceList: any[] = [];
  creditNoteList: any[] = [];

  // Products from the selected invoice
  invoiceProducts: any[] = [];
  // Map to store remaining quantity for each product: productName -> remainingQty
  productRemainingQtyMap: Record<string, number> = {};
  selectedProductRemainingQty: number = 0;

  data: CreditNoteProductData[] = [];
  displayedColumns: string[] = [
    '#',
    'PoNumber',
    'product',
    'HSNCode',
    'measurementUnits',
    'qty',
    'Price',
    'FinalAmount',
    'action',
  ];
  addinvoiceDataSource = new MatTableDataSource(this.data);
  selectedIndex = 0;
  accountYear = localStorage.getItem("accountYear");
  nextCreditNoteNumber: string = 'CN-001';

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private loaderService: LoaderService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getPartyList();
    this.getAllInvoiceList();
    this.getAllCreditNotes();
    this.addinvoiceDataSource.paginator = this.paginator;

    // Listen to product selection to auto-fill details
    this.creditNoteForm.get('product')?.valueChanges.subscribe(selectedProd => {
      if (selectedProd) {
        const prodName = selectedProd.productName?.productName || selectedProd.productName;
        this.creditNoteForm.get('measurementUnits')?.setValue(selectedProd.measurementUnits || '');
        this.creditNoteForm.get('HSNCode')?.setValue(selectedProd.HSNCode || '');
        this.creditNoteForm.get('price')?.setValue(selectedProd.price || 0);
        this.selectedProductRemainingQty = this.productRemainingQtyMap[prodName] || 0;
      } else {
        this.creditNoteForm.get('measurementUnits')?.reset();
        this.creditNoteForm.get('HSNCode')?.reset();
        this.creditNoteForm.get('price')?.reset();
        this.selectedProductRemainingQty = 0;
      }
    });
  }

  buildForm() {
    this.creditNoteForm = this.fb.group({
      party: ['', Validators.required],
      invoice: ['', Validators.required],
      date: [new Date(), Validators.required],
      product: ['', Validators.required],
      qty: ['', [Validators.required, Validators.min(0.01)]],
      price: ['', [Validators.required, Validators.min(0)]],
      measurementUnits: ['', Validators.required],
      HSNCode: ['', Validators.required],
      remarks: ['']
    });
  }

  getPartyList() {
    this.loaderService.setLoader(true);
    this.firebaseService.getAllParty().subscribe((res: any) => {
      if (res) {
        this.partyList = res.filter((id: any) => id.userId === localStorage.getItem("userId"));
        this.loaderService.setLoader(false);
      }
    }, () => {
      this.loaderService.setLoader(false);
    });
  }

  getAllInvoiceList() {
    this.loaderService.setLoader(true);
    this.firebaseService.getAllInvoice().subscribe((res: any) => {
      if (res) {
        this.invoiceList = res.filter((id: any) => id.userId === localStorage.getItem("userId"));
        this.loaderService.setLoader(false);
      }
    }, () => {
      this.loaderService.setLoader(false);
    });
  }

  getAllCreditNotes() {
    this.loaderService.setLoader(true);
    this.firebaseService.getAllCreditNote().subscribe((res: any) => {
      if (res) {
        this.creditNoteList = res.filter((id: any) => 
          id.userId === localStorage.getItem("userId") &&
          id.accountYear === localStorage.getItem("accountYear")
        );
        this.calculateNextCreditNoteNumber();
        this.loaderService.setLoader(false);
      }
    }, () => {
      this.loaderService.setLoader(false);
    });
  }

  calculateNextCreditNoteNumber(firmId?: string) {
    let maxVal = 0;
    this.creditNoteList.forEach((cn: any) => {
      if (cn.creditNoteNumber && cn.accountYear === this.accountYear) {
        if (!firmId || cn.firmId === firmId) {
          const match = cn.creditNoteNumber.match(/CN-(\d+)/);
          if (match) {
            const val = parseInt(match[1], 10);
            if (val > maxVal) {
              maxVal = val;
            }
          }
        }
      }
    });
    const nextNum = maxVal + 1;
    this.nextCreditNoteNumber = 'CN-' + String(nextNum).padStart(3, '0');
  }

  seletedParty(event: any) {
    const selectedParty = event.value;
    this.filteredInvoiceList = this.invoiceList.filter(inv => inv.partyId === selectedParty.id);
    this.creditNoteForm.get('invoice')?.reset();
    this.invoiceProducts = [];
    this.data = [];
    this.addinvoiceDataSource.data = [];
    this.calculateNextCreditNoteNumber();
  }

  seletedInvoice(event: any) {
    const selectedInvoice = event.value;
    if (!selectedInvoice) return;

    this.invoiceProducts = selectedInvoice.products || [];
    this.data = [];
    this.addinvoiceDataSource.data = [];
    this.calculateNextCreditNoteNumber(selectedInvoice.firmId);
    this.creditNoteForm.get('product')?.reset();

    // Compute remaining quantities
    this.productRemainingQtyMap = {};
    const invoiceCreditNotes = this.creditNoteList.filter(cn => cn.invoiceId === selectedInvoice.id && cn.status !== 'Cancelled');

    this.invoiceProducts.forEach(prod => {
      const prodName = prod.productName?.productName || prod.productName;
      const originalQty = prod.qty - (prod.defectiveItem || 0);

      // Sum of credited quantities for this product
      const creditedQty = invoiceCreditNotes.reduce((total, cn) => {
        const cnProd = cn.products.find((p: any) => (p.productName?.productName || p.productName) === prodName);
        return total + (cnProd ? cnProd.qty : 0);
      }, 0);

      this.productRemainingQtyMap[prodName] = Math.max(0, originalQty - creditedQty);
    });
  }

  addData(): void {
    if (this.creditNoteForm.get('product')?.invalid ||
      this.creditNoteForm.get('qty')?.invalid ||
      this.creditNoteForm.get('price')?.invalid ||
      this.creditNoteForm.get('measurementUnits')?.invalid ||
      this.creditNoteForm.get('HSNCode')?.invalid) {
      this.openConfigSnackBar('Please fill in all product fields correctly');
      return;
    }

    const formVal = this.creditNoteForm.value;
    const prodName = formVal.product.productName?.productName || formVal.product.productName;

    // Validations
    const remainingQty = this.productRemainingQtyMap[prodName] || 0;
    if (formVal.qty > remainingQty) {
      this.openConfigSnackBar(`Quantity cannot exceed available original invoice quantity (${remainingQty})`);
      return;
    }

    // Check for duplicates in current list
    const isDuplicate = this.data.some(item => {
      const existingName = item.product.productName?.productName || item.product.productName || item.product;
      return existingName === prodName;
    });

    if (isDuplicate) {
      this.openConfigSnackBar('Product already added to the Credit Note');
      return;
    }

    const item: CreditNoteProductData = {
      id: this.nextId++,
      product: formVal.product,
      measurementUnits: formVal.measurementUnits,
      HSNCode: formVal.HSNCode,
      poNumber: formVal.product.poNumber || '',
      qty: formVal.qty,
      price: formVal.price,
      finalAmount: Number((formVal.qty * formVal.price).toFixed(2))
    };

    this.data.push(item);
    this.addinvoiceDataSource.data = [...this.data];

    // Reset product fields
    ['product', 'measurementUnits', 'HSNCode', 'qty', 'price'].forEach(control => {
      this.creditNoteForm.get(control)?.reset();
    });
    this.editMode = false;
  }

  edit(element: any) {
    this.editMode = true;
    this.currentEditId = element.id;
    this.currentEditIndex = this.data.findIndex(item => item.id === element.id);

    // Find the product object in invoiceProducts list
    const prodName = element.product.productName?.productName || element.product.productName || element.product;
    const selectedProd = this.invoiceProducts.find(p => (p.productName?.productName || p.productName) === prodName);

    this.creditNoteForm.patchValue({
      product: selectedProd || element.product,
      measurementUnits: element.measurementUnits,
      HSNCode: element.HSNCode,
      qty: element.qty,
      price: element.price
    });
  }

  updateData() {
    if (this.creditNoteForm.get('product')?.invalid ||
      this.creditNoteForm.get('qty')?.invalid ||
      this.creditNoteForm.get('price')?.invalid ||
      this.creditNoteForm.get('measurementUnits')?.invalid ||
      this.creditNoteForm.get('HSNCode')?.invalid) {
      this.openConfigSnackBar('Please fill in all product fields correctly');
      return;
    }

    const formVal = this.creditNoteForm.value;
    const prodName = formVal.product.productName?.productName || formVal.product.productName;

    // Check remaining quantity
    const remainingQty = this.productRemainingQtyMap[prodName] || 0;
    if (formVal.qty > remainingQty) {
      this.openConfigSnackBar(`Quantity cannot exceed available original invoice quantity (${remainingQty})`);
      return;
    }

    const item: CreditNoteProductData = {
      id: this.currentEditId,
      product: formVal.product,
      measurementUnits: formVal.measurementUnits,
      HSNCode: formVal.HSNCode,
      poNumber: formVal.product.poNumber || '',
      qty: formVal.qty,
      price: formVal.price,
      finalAmount: Number((formVal.qty * formVal.price).toFixed(2))
    };

    this.data[this.currentEditIndex] = item;
    this.addinvoiceDataSource.data = [...this.data];

    // Reset product fields
    ['product', 'measurementUnits', 'HSNCode', 'qty', 'price'].forEach(control => {
      this.creditNoteForm.get(control)?.reset();
    });
    this.editMode = false;
  }

  deletedata(id: number) {
    this.data = this.data.filter(item => item.id !== id);
    this.addinvoiceDataSource.data = [...this.data];
  }

  calculateSubTotal(): number {
    return this.data.reduce((acc, item) => acc + item.finalAmount, 0);
  }

  calculateDiscount(subtotal: number): number {
    const selectedInvoice = this.creditNoteForm.get('invoice')?.value;
    const discountPercent = selectedInvoice?.discount || 0;
    return Number((subtotal * discountPercent / 100).toFixed(2));
  }

  calculateTax(taxableAmount: number): { cgst: number, sgst: number } {
    const selectedInvoice = this.creditNoteForm.get('invoice')?.value;
    const cgstPercent = selectedInvoice?.cGST || 0;
    const sgstPercent = selectedInvoice?.sGST || 0;

    return {
      cgst: Number((taxableAmount * cgstPercent / 100).toFixed(2)),
      sgst: Number((taxableAmount * sgstPercent / 100).toFixed(2))
    };
  }

  generateCreditNote() {
    if (this.creditNoteForm.get('party')?.invalid || this.creditNoteForm.get('invoice')?.invalid || this.creditNoteForm.get('date')?.invalid) {
      this.openConfigSnackBar('Please fill in Party, Invoice, and Date');
      return;
    }

    if (this.data.length === 0) {
      this.openConfigSnackBar('Please add at least one product to the Credit Note');
      return;
    }

    const formVal = this.creditNoteForm.value;
    const selectedInvoice = formVal.invoice;
    const selectedParty = formVal.party;

    const subtotal = this.calculateSubTotal();
    const discountAmount = this.calculateDiscount(subtotal);
    const taxableAmount = subtotal - discountAmount;
    const taxes = this.calculateTax(taxableAmount);
    const grandTotal = taxableAmount + taxes.cgst + taxes.sgst;
    const roundedTotal = Math.round(grandTotal);
    const roundOff = Number((roundedTotal - grandTotal).toFixed(2));

    // Map products to Firestore structure
    const productsPayload = this.data.map(item => ({
      productName: item.product?.productName || item.product,
      measurementUnits: item.measurementUnits,
      HSNCode: item.HSNCode,
      qty: item.qty,
      price: item.price,
      poNumber: item.poNumber,
      finalAmount: item.finalAmount
    }));

    const payload: any = {
      id: '',
      creditNoteNumber: this.nextCreditNoteNumber,
      creditNoteDate: moment(formVal.date).format('YYYY-MM-DD'),
      partyId: selectedParty.id,
      partyName: selectedParty,
      invoiceId: selectedInvoice.id,
      invoiceNumber: selectedInvoice.invoiceNumber,
      invoiceDate: selectedInvoice.date,
      products: productsPayload,
      subtotal: Number(subtotal.toFixed(2)),
      discount: selectedInvoice.discount || 0,
      taxableAmount: Number(taxableAmount.toFixed(2)),
      cGST: selectedInvoice.cGST || 0,
      sGST: selectedInvoice.sGST || 0,
      igst: 0,
      totalTax: Number((taxes.cgst + taxes.sgst).toFixed(2)),
      grandTotal: roundedTotal,
      roundOff: roundOff,
      finalAmount: roundedTotal,
      status: 'Active',
      remarks: formVal.remarks || '',
      firmId: selectedInvoice.firmId,
      firmName: selectedInvoice.firmName || {},
      TransPort: selectedInvoice.TransPort || '',
      TransPortName: selectedInvoice.TransPortName || {},
      userId: localStorage.getItem('userId'),
      accountYear: this.accountYear,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: localStorage.getItem('userId')
    };

    this.loaderService.setCreditNoteData(payload);
    this.router.navigate(['/master/creditnoteview']);
  }

  openConfigSnackBar(snackbarTitle: any) {
    this._snackBar.open(snackbarTitle, 'Splash', {
      duration: 2 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
