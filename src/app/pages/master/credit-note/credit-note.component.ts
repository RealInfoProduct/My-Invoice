import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoaderService } from 'src/app/services/loader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfgenService } from '../pdfgen.service';
import { MatSort } from '@angular/material/sort';
import { CreditNoteDialogComponent } from './credit-note-dialog/credit-note-dialog.component';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-credit-note',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.scss']
})
export class CreditNoteComponent implements OnInit {
  dateCreditNoteListForm: FormGroup;
  creditNoteList: any = [];
  firmList: any = [];
  partyList: any = [];

  firms: any[] = [];
  firmWiseCreditNotes: any = {};
  selectedPartyId: string = '';
  displayedColumns: string[] = [
    '#',
    'firmName',
    'creditNoteNo',
    'invoiceNo',
    'productName',
    'qty',
    'price',
    'CGST',
    'SGST',
    'finalSubAmount',
    'action',
  ];
  creditNoteDataSource = new MatTableDataSource(this.creditNoteList);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;
  @ViewChild('tabGroup') tabGroup: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private firebaseService: FirebaseService,
    private loaderService: LoaderService,
    private pdfgenService: PdfgenService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getCreditNoteList();
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.dateCreditNoteListForm = this.fb.group({
      start: [startDate],
      end: [endDate]
    });
    this.getFirmList();
    this.getPartyList();
  }

  filterDate() {
    if (!this.creditNoteList) return;

    const start = this.dateCreditNoteListForm.value.start;
    const end = this.dateCreditNoteListForm.value.end;

    if (!start || !end) {
      this.getCreditNoteList(); // reset
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    Object.keys(this.firmWiseCreditNotes).forEach((firmId: string) => {
      const originalData = this.creditNoteList.filter((x: any) => x.firmId === firmId);

      const filteredData = originalData.filter((cn: any) => {
        if (!cn.creditNoteDate) return false;

        let cnDate: Date;
        if (cn.creditNoteDate instanceof Date) {
          cnDate = cn.creditNoteDate;
        } else {
          cnDate = new Date(cn.creditNoteDate);
        }

        if (isNaN(cnDate.getTime())) return false;

        cnDate.setHours(0, 0, 0, 0);
        return cnDate >= startDate && cnDate <= endDate;
      });

      this.firmWiseCreditNotes[firmId].data = filteredData;
      this.firmWiseCreditNotes[firmId]._updateChangeSubscription();
    });
  }

  viewProducts(products: any[]) {
    this.dialog.open(CreditNoteDialogComponent, { data: products });
  }

  onPartyChange(partyId: string) {
    this.selectedPartyId = partyId;
    this.applyAllFilters();   // filter data first
    this.openPartyTab(partyId); // then switch tab
  }

  openPartyTab(partyId: string) {
    const cn = this.creditNoteList.find((x: any) => x.partyId === partyId);
    if (!cn) return;

    const firmId = cn.firmId;
    const tabIndex = this.firms.findIndex((f: any) => f.firmId === firmId);

    if (tabIndex !== -1 && this.tabGroup) {
      this.tabGroup.selectedIndex = tabIndex;
    }
  }

  applyAllFilters() {
    const start = this.dateCreditNoteListForm.value.start;
    const end = this.dateCreditNoteListForm.value.end;

    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    if (startDate) startDate.setHours(0, 0, 0, 0);
    if (endDate) endDate.setHours(23, 59, 59, 999);

    Object.keys(this.firmWiseCreditNotes).forEach((firmId: string) => {
      const original = this.creditNoteList.filter((x: any) => x.firmId === firmId);

      const filtered = original.filter((cn: any) => {
        // PARTY FILTER
        if (this.selectedPartyId && cn.partyId !== this.selectedPartyId) {
          return false;
        }

        // DATE FILTER
        if (cn.creditNoteDate) {
          const d = new Date(cn.creditNoteDate);
          if (startDate && d < startDate) return false;
          if (endDate && d > endDate) return false;
        }

        return true;
      });

      // refresh datasource
      this.firmWiseCreditNotes[firmId].data = filtered;
      this.firmWiseCreditNotes[firmId]._updateChangeSubscription();
    });
  }

  applyFilter(filterValue: string): void {
    const filter = filterValue.trim().toLowerCase();

    Object.keys(this.firmWiseCreditNotes).forEach((key: string) => {
      const dataSource = this.firmWiseCreditNotes[key];

      dataSource.filterPredicate = (data: any, filterStr: string) => {
        const searchText = filterStr.trim().toLowerCase();
        const cnNumber = data.creditNoteNumber?.toString().toLowerCase() || '';
        const invoiceNumber = data.invoiceNumber?.toString().toLowerCase() || '';
        const partyName = this.partyList.find((p: any) => p.id === data.partyId)?.partyName?.toLowerCase() || '';

        return (
          cnNumber.includes(searchText) ||
          invoiceNumber.includes(searchText) ||
          partyName.includes(searchText)
        );
      };

      dataSource.filter = filter;
      dataSource._updateChangeSubscription();
    });
  }

  addCreditNote() {
    this.router.navigate(['/master/addcreditnote']);
  }

  getCreditNoteList() {
    this.loaderService.setLoader(true);
    this.firebaseService.getAllCreditNote().subscribe((res: any) => {
      if (res) {
        this.creditNoteList = res.filter((id: any) =>
          id.userId === localStorage.getItem("userId") &&
          id.accountYear === localStorage.getItem("accountYear")
        );

        const uniqueFirmIds = [...new Set(this.creditNoteList.map((x: any) => x.firmId))] as string[];

        // Tabs
        this.firms = uniqueFirmIds.map((id: string) => {
          const firm = this.getFirmHeader(id);
          return {
            firmId: id,
            name: firm?.header || 'Firm ' + id
          };
        });

        // Group data
        this.firmWiseCreditNotes = {};
        uniqueFirmIds.forEach((id: string) => {
          const data = this.creditNoteList.filter((x: any) => x.firmId === id)
            .sort((a: any, b: any) => {
              const aNum = parseInt(a.creditNoteNumber?.replace('CN-', '') || '0', 10);
              const bNum = parseInt(b.creditNoteNumber?.replace('CN-', '') || '0', 10);
              return bNum - aNum;
            });
          this.firmWiseCreditNotes[id] = new MatTableDataSource(data);
        });

        this.loaderService.setLoader(false);
        setTimeout(() => this.assignPaginators());
        this.filterDate();
      }
    }, () => {
      this.loaderService.setLoader(false);
    });
  }

  assignPaginators() {
    const paginatorArray = this.paginators.toArray();
    this.firms.forEach((firm, index) => {
      const ds = this.firmWiseCreditNotes[firm.firmId];
      if (ds) {
        ds.paginator = paginatorArray[index];
      }
    });
  }

  deleteCreditNote(element: any) {
    const dialogRef = this.dialog.open(CreditNoteDialogComponent, {
      data: {
        action: 'Delete',
        id: element.id,
        Name: element.creditNoteNumber
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.event === 'Delete') {
        this.firebaseService.deleteCreditNote(element.id).then(() => {
          this.getCreditNoteList();
          this.openConfigSnackBar('record delete successfully');
        }).catch((error) => {
          console.log("error => ", error);
        });
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

  generatePDFDownload(creditNoteData: any) {
    const partyData = this.getPartyName(creditNoteData.partyId);
    const firmData = this.getFirmHeader(creditNoteData.firmId);
    creditNoteData['firmName'] = firmData;
    creditNoteData['partyName'] = partyData;
    this.pdfgenService.generateCreditNotePDFDownload(creditNoteData);
  }

  getFirmList() {
    this.loaderService.setLoader(true);
    this.firebaseService.getAllFirm().subscribe((res: any) => {
      if (res) {
        this.firmList = res.filter((id: any) => id.userId === localStorage.getItem("userId"));
        this.loaderService.setLoader(false);
      }
    }, () => {
      this.loaderService.setLoader(false);
    });
  }

  getPartyList() {
    this.loaderService.setLoader(true);
    this.firebaseService.getAllParty().subscribe((res: any) => {
      if (res) {
        this.partyList = res.filter((id: any) => id.userId === localStorage.getItem("userId"));
        this.getCreditNoteList();
        this.loaderService.setLoader(false);
      }
    }, () => {
      this.loaderService.setLoader(false);
    });
  }

  getPartyName(partyId: string) {
    return this.partyList.find((obj: any) => obj.id === partyId) ?? '';
  }

  getFirmHeader(firmId: string) {
    return this.firmList.find((obj: any) => obj.id === firmId) ?? '';
  }

  filedownload() {
    if (!this.tabGroup) {
      this.openConfigSnackBar('Tab not initialized');
      return;
    }

    const selectedIndex = this.tabGroup.selectedIndex;
    if (selectedIndex === null || selectedIndex === undefined) {
      this.openConfigSnackBar('No tab selected');
      return;
    }

    const firm = this.firms[selectedIndex];
    if (!firm) {
      this.openConfigSnackBar('Firm not found');
      return;
    }

    const ds = this.firmWiseCreditNotes[firm.firmId];
    if (!ds) {
      this.openConfigSnackBar('No data source found');
      return;
    }

    const creditNotes = ds.filteredData && ds.filteredData.length ? ds.filteredData : ds.data;
    if (!creditNotes || creditNotes.length === 0) {
      this.openConfigSnackBar('No credit note data available');
      return;
    }

    const doc = new jsPDF();
    const startDate = new Date(this.dateCreditNoteListForm.value.start);
    const endDate = new Date(this.dateCreditNoteListForm.value.end);
    const formattedStart = startDate.toLocaleDateString('en-GB');
    const formattedEnd = endDate.toLocaleDateString('en-GB');

    const firmName = this.getFirmHeader(firm.firmId)?.header || '';
    const partyObj = this.partyList.find((p: any) => p.id === this.selectedPartyId);
    const partyName = partyObj?.partyName || 'All Parties';

    doc.setFontSize(12);
    doc.text(`Firm Name: ${firmName}`, 14, 12);
    doc.text(`Party Name: ${partyName}`, 14, 18);
    doc.text(`Credit Note Report Date: ${formattedStart} to ${formattedEnd}`, 14, 24);

    let total = 0;
    const headers = ['S.No', 'Firm', 'Party', 'Credit Note No', 'Invoice No', 'CGST %', 'SGST %', 'Final Amount'];

    const tableData = creditNotes.map((cn: any, index: number) => {
      const finalAmt = Number(cn.finalAmount || 0);
      total += finalAmt;

      const party = this.getPartyName(cn.partyId)?.partyName || '';
      const firmVal = this.getFirmHeader(cn.firmId)?.header || '';

      return [
        index + 1,
        firmVal,
        party,
        cn.creditNoteNumber || '',
        cn.invoiceNumber || '',
        cn.cGST || 0,
        cn.sGST || 0,
        finalAmt
      ];
    });

    doc.text(`Total Credited: ${total.toFixed(2)}`, 140, 12);

    (doc as any).autoTable({
      head: [headers],
      body: tableData,
      startY: 28,
      theme: 'grid',
      styles: {
        fontSize: 9,
        halign: 'center'
      },
      headStyles: {
        fillColor: [255, 193, 7],
        textColor: 0
      }
    });

    doc.save(`${firmName}_CreditNotes.pdf`);
  }
}
