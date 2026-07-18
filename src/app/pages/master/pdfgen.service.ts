import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LoaderService } from 'src/app/services/loader.service';
import { ToWords } from 'to-words';
@Injectable({
  providedIn: 'root'
})
export class PdfgenService {
  toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
    },
  });

  accountYear = localStorage.getItem("accountYear");
  constructor(private loaderService: LoaderService) { }

  generatePDF1Download(invoiceData: any) {
    this.loaderService.setLoader(true)
    const doc: any = new jsPDF();
    const header = (doc: any) => {
      doc.setFillColor('#fff');
      doc.rect(0, 0, doc.internal.pageSize.width, 10, 'F');
      const yPosition = 10;

      doc.setFillColor('#6fd32c');
      const rowHeight = 18;
      doc.rect(0, yPosition - rowHeight, doc.internal.pageSize.width, rowHeight, 'F');

      doc.setFontSize(12); doc.setTextColor(0, 0, 0); const verticalCenter = yPosition - rowHeight / 2 + 6;
      const phoneNumberLeft = `Mo. : ${invoiceData.firmName.mobileNo}`; const leftXPosition = 10;
      doc.text(phoneNumberLeft, leftXPosition, verticalCenter, { align: 'left' });

      const phoneNumberMiddle = "Jay Shree Ganesh"; const middleXPosition = doc.internal.pageSize.width / 2;
      doc.text(phoneNumberMiddle, middleXPosition, verticalCenter, { align: 'center' });

      const borderYPosition = yPosition + 1;
      const topMargin = 0;
      const bottomMargin = 4;
      const logoYPosition = borderYPosition + topMargin;

      const imgData = '../../../../assets/images/logos/Green Orange Renewable Energy Company Logo_20250519_130127_0000.png';
      const imgWidth = 30;
      const imgHeight = 30;
      const xPosition = 7;
      doc.addImage(imgData, 'JPEG', xPosition, logoYPosition, imgWidth, imgHeight, undefined, 'FAST');

      const borderXPosition = xPosition + imgWidth + 10;
      const borderYStart = logoYPosition;
      const borderYEnd = logoYPosition + imgHeight;

      // Step 1: Add Firm Name (Bold & Centered)
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');

      const firmName = invoiceData.firmName.header;
      const firmNameWidth = doc.getTextWidth(firmName);
      const firmNameX = (pageWidth - firmNameWidth) / 2;
      const firmNameY = 20; // Starting Y position

      doc.text(firmName, firmNameX, firmNameY);

      // Step 2: Add Subheader (Italic & Centered, below Firm Name)
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');

      const subHeader = invoiceData.firmName.subHeader;
      const subHeaderWidth = doc.getTextWidth(subHeader);
      const subHeaderX = (pageWidth - subHeaderWidth) / 2;
      const subHeaderY = firmNameY + 8; // 8px gap below Firm Name

      doc.text(subHeader, subHeaderX, subHeaderY);

      // Step 3: Add Address (Centered Below Subheader, supports multiple lines)
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');

      // 🔹 Define address first
      const address = invoiceData.firmName.address;

      const maxWidth = pageWidth - 70;
      const lineHeight = 5;
      const addressStartY = 35;

      const addressLines = doc.splitTextToSize(address, maxWidth);

      // 🔹 Center align properly
      addressLines.forEach((line: string, index: number) => {
        doc.text(line, pageWidth / 1.8, addressStartY + (index * lineHeight), {
          align: 'center'
        });
      });
    };

    const lineTopYPosition = 43.7;
    doc.setLineWidth(0.3);
    doc.line(0, lineTopYPosition, doc.internal.pageSize.width, lineTopYPosition);

    doc.setFontSize(10);
    doc.setFillColor('#eee')
    const mobileNumberLeft = `GSTIN: ${invoiceData.firmName.gstNo}`;
    const mobileNumberRight = `PAN: ${invoiceData.firmName.panNo}`;

    const leftXPosition = 10;
    const yPosition = 50;
    const backgroundHeight = 9;

    doc.rect(0, yPosition - 6, doc.internal.pageSize.width, backgroundHeight, 'F');
    doc.text(mobileNumberLeft, leftXPosition, yPosition, { align: 'left' });
    doc.text(mobileNumberRight, doc.internal.pageSize.width - 10, yPosition, { align: 'right' });

    const lineYPosition = yPosition + 3;

    doc.setLineWidth(0.3);
    doc.line(0, lineYPosition, doc.internal.pageSize.width, lineYPosition)

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const boxHeight = 35;
    const boxYPosition = 55;

    const box1Width = pageWidth * 0.75;
    const box1XPosition = 10;
    doc.setFillColor('#fff');
    doc.rect(box1XPosition, boxYPosition, box1Width, boxHeight, 'F');

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    // const fieldsLeft = ["M/s:", "Address:", "GSTIN:","TransPort Id:"];
    // const fieldsLeftValues = [
    //   `${invoiceData.partyName.partyName}`,
    //   `${invoiceData.partyName.partyAddress}`,
    //   `${invoiceData.partyName.partyGstNo}`,
    //    invoiceData.TransPortName?.transPortId ?? ""
    // ];

    // const leftYPosition = boxYPosition + 5;
    // const boxWidth = doc.internal.pageSize.width * 0.63 - box1XPosition - 12;
    // const labelXPosition = box1XPosition;
    // const valueXPosition = box1XPosition + 24;

    // fieldsLeft.forEach((field, index) => {
    //   const yPosition = leftYPosition + (index * 9.5);
    //   doc.text(field, labelXPosition, yPosition);
    //   doc.text(fieldsLeftValues[index], valueXPosition, yPosition);

    //   const lineYPosition = yPosition + 1;
    //   doc.setLineWidth(0.3);
    //   doc.line(valueXPosition, lineYPosition, valueXPosition + boxWidth, lineYPosition);
    // });

       doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('GSTIN:', 10, 85);
    doc.text(invoiceData.partyName.partyGstNo, 33, 85);
     doc.setLineWidth(0.3);
      doc.line(100,87,33,87);

    const fieldsLeft = ["M/s:", "Address:"];

    const fieldsLeftValues = [
      `${invoiceData.partyName.partyName}`,
      `${invoiceData.partyName.partyAddress}`
    ];

    const leftYPosition = boxYPosition + 5;
    const boxWidth = doc.internal.pageSize.width * 0.63 - box1XPosition - 12;

    const labelXPosition = box1XPosition;
    const valueXPosition = box1XPosition + 24;

    let currentY = leftYPosition;

    fieldsLeft.forEach((field, index) => {
      let value = fieldsLeftValues[index];

      // Print label
      doc.text(field, labelXPosition, currentY);

      if (field === "Address:") {
        // Address ne multiple lines ma split karo
        const splitAddress = doc.splitTextToSize(value, boxWidth);

        // Address print karo
        doc.text(splitAddress, valueXPosition, currentY);

        // Line count pramane next Y calculate karo
        const lineHeight = 3;
        const totalHeight = splitAddress.length * lineHeight;

        // Bottom line draw karo
        const lineYPosition = currentY + totalHeight;
        doc.setLineWidth(0.3);
        doc.line(valueXPosition, lineYPosition, valueXPosition + boxWidth, lineYPosition);

        // Next field mate Y update karo
        currentY += totalHeight + 6;

      } else {
        // Normal fields
        doc.text(value, valueXPosition, currentY);

        const lineYPosition = currentY + 1;
        doc.setLineWidth(0.3);
        doc.line(valueXPosition, lineYPosition, valueXPosition + boxWidth, lineYPosition);

        currentY += 9.5;
      }
    });

    const box2Width = pageWidth * 0.25;
    const box2XPosition = box1XPosition + box1Width + 5;
    doc.setFillColor('#fff');
    doc.rect(box2XPosition - 25, boxYPosition, box2Width, boxHeight, 'F');

    const formatDate = (date: any) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();

      return `${day}/${month}/${year}`;
    };

      doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('TransPort Id:', 110, 85);
    doc.text(invoiceData.TransPortName?.transPortId ?? "", 135, 85);
      doc.setLineWidth(0.3);
      doc.line(135,87,200,87);

    const fieldsRight = ["Invoice: ", "Date: ", "PAN: "];
    const fieldsRightValues = [`${invoiceData.invoiceNumber} - ${this.accountYear}`, formatDate(invoiceData.date), `${invoiceData.partyName.partyPanNo}`]; // Corresponding values
    const rightYPosition = boxYPosition + 5;

    fieldsRight.forEach((field, index) => {
      const yPosition = rightYPosition + (index * 9.5);

      if (index === 0) {
        doc.setTextColor(255, 0, 0);
      } else {
        doc.setTextColor(0, 0, 0);
      }

      doc.text(field, box2XPosition - 25, yPosition);
      const textWidth = doc.getTextWidth(field);

      doc.setTextColor(0, 0, 0);

      if (index === 1) {
        doc.setFont(undefined, 'bold');
      }
      const valueXPosition = (box2XPosition - 28) + textWidth + 5;
      const valueYPosition = yPosition;
      doc.text(fieldsRightValues[index], valueXPosition, valueYPosition);

      if (index === 1) {
        doc.setFont(undefined, 'normal');
      }

      const lineYPosition = valueYPosition + 1;
      doc.setLineWidth(0.3);
      doc.line((box2XPosition - 25) + textWidth + 2, lineYPosition, (box2XPosition - 25) + box2Width, lineYPosition);
    });

    const columns = ["Sr", "Product","HSNCode",  "Chalan No", "Qty", "Rate", "Amount"];
    const data: any = invoiceData.products;
    data.forEach((ele: any) => { ele.total = Number(ele.qty) * Number(ele.price) })
    const body: any = [];
    // for (let i = 0; i < 10; i++) {
    //   const row = [
    //     i + 1, // Convert number to string
    //     data[i]?.productName?.productName ? data[i]?.productName?.productName : '',
    //     data[i]?.poNumber ? data[i]?.poNumber.toString() : '',
    //     data[i]?.qty ? Number(data[i]?.qty).toFixed(2).toString() : '',
    //     data[i]?.defectiveItem ? Number(data[i]?.defectiveItem).toFixed(2).toString() : '',
    //     data[i]?.price ? Number(data[i]?.price).toFixed(2).toString() : '',
    //     data[i]?.finalAmount ? `${Number(data[i]?.finalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''
    //   ];
    //   body.push(row);
    // }
    for (let i = 0; i < 10; i++) {

      const hasData = data[i] && data[i]?.productName?.productName;

      const row = [
        hasData ? i + 1 : '', // ✅ Only show number if data exists
        hasData ? data[i]?.productName?.productName : '',
        hasData ? data[i]?.HSNCode : '',
        hasData ? (data[i]?.poNumber || '') : '',
         hasData
                ? (data[i]?.qty
                    ? `${Number(data[i]?.qty)}${
                        data[i]?.measurementUnits
                          ? ` (${data[i].measurementUnits})`
                          : ''
                      }`
                    : '')
                : '',
        hasData ? (data[i]?.price ? Number(data[i]?.price).toFixed(2) : '') : '',
        hasData
          ? `${Number(data[i]?.finalAmount).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`
          : ''
      ];

      body.push(row);
    }

    const productsSubTotal = invoiceData.products.reduce((acc: any, product: any) => acc + product.finalAmount, 0);
    const discountAmount = (productsSubTotal * (invoiceData.discount / 100));
    const discountedSubTotal = productsSubTotal - discountAmount;
    const sGstAmount = discountedSubTotal * (invoiceData.sGST / 100);
    const cGstAmount = discountedSubTotal * (invoiceData.cGST / 100);
    const finalAmount = discountedSubTotal + sGstAmount + cGstAmount;

    const formattedAmount = new Intl.NumberFormat('en-IN').format(parseFloat(productsSubTotal.toFixed(2)));
    const Amount = new Intl.NumberFormat('en-IN').format(parseFloat(finalAmount.toFixed(2)));
    const discountAmountFormatted = discountAmount.toFixed(2);
    const sGstAmountFormatted = sGstAmount.toFixed(2);
    const cGstAmountFormatted = cGstAmount.toFixed(2);
    const roundedAmount = Math.round(finalAmount);
    const formattedRoundedAmount = new Intl.NumberFormat('en-IN').format(roundedAmount);
    const finalAmountInWords = this.toWords.convert(Number(roundedAmount));
    // ['', '', '', '', '', { content: `Discount ${invoiceData.discount}%`, styles: { halign: 'left' } }, `Rs. ${discountAmountFormatted}`],
    body.push(
      ['', '', '', '', '',{ content: 'Gross Total', styles: { halign: 'left' } }, `Rs. ${formattedAmount}`],
      ['', '', '', '', '',{ content: `CGST ${invoiceData.cGST}%` }, `Rs. ${cGstAmountFormatted}`],
      [{ content: `${finalAmountInWords}`, rowSpan: 3, colSpan: 5, styles: { halign: 'center', fontStyle: 'bold' } }, `SGST ${invoiceData.sGST}%`, `Rs. ${sGstAmountFormatted}`],
      [{ content: 'Total Amount' }, `Rs. ${Amount}`, { styles: { FontFace: 'left' } }],
      [{ content: 'Final Amount' }, `Rs. ${formattedRoundedAmount}.00`, { styles: { FontFace: 'left' } }],
    );

    const footer = (doc: any, pageNumber: any, totalPages: any) => {
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Page ${pageNumber} of ${totalPages}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
      doc.line(10, doc.internal.pageSize.height - 15, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 15);
    };

    autoTable(doc, {
      head: [columns],
      body: body,
      startY: 95,
      theme: 'plain',
      margin: { top: 0, right: 10, bottom: 0, left: 10 },
      tableWidth: 'auto',
      headStyles: {
        fillColor: '#6fd32c',
        textColor: '#000',
        fontSize: 11,
        font: 'helvetica',
        fontStyle: 'bold',
        cellPadding: 3,
        lineWidth: 0.50
      },
      styles: {
        cellPadding: 2,
        lineWidth: 0,
        // lineWidth: 0.1,
        // lineColor: [0, 0, 0]
      },
      // didParseCell: (data) => {
      //   const { row, column } = data;
      //   const lastRowIndex = body.length;

      //   if (row.index >= lastRowIndex - 6 && row.index <= lastRowIndex - 1 && (column.index === 5 || column.index === 6)) {
      //     data.cell.styles.fontStyle = 'bold';
      //   }

      //   if (data.row.index === body.length - 1) {
      //     data.cell.styles.textColor = '#000';
      //     data.cell.styles.fillColor = '#6fd32c';
      //     data.cell.styles.fontStyle = 'bold';
      //   }

      //   if (data.row.index === body.length) {
      //     data.cell.styles.textColor = '#000';
      //     data.cell.styles.fillColor = '#eee';
      //   }
      // },
      // didDrawPage: (data) => {
      //   header(doc);
      //   const pageNumber = doc.internal.getNumberOfPages();
      //   footer(doc, pageNumber, pageNumber);
      // },

      didParseCell: (data) => {
        const rowIndex = data.row.index;
        const colIndex = data.column.index;
        const rowData = body[rowIndex];

        const hasData = rowData && rowData[1] && rowData[1].toString().trim() !== '';
        const lastRowIndex = body.length;
        doc.setLineWidth(0.1);
        data.cell.styles.lineColor = [0, 0, 0];
        doc.line(10, 100, 10, 226);
        doc.setLineWidth(0.1);
        data.cell.styles.lineColor = [0, 0, 0];
        doc.line(200, 100, 200, 226);
        // 👉 PRODUCT ROWS (first 10)
        if (rowIndex < 10) {

          if (hasData) {
            // ✅ Data row → full border
            data.cell.styles.lineWidth = 0.1;
            data.cell.styles.lineColor = [0, 0, 0];
          } else {
            // ❌ Empty row → remove all borders
            data.cell.styles.lineWidth = 0;

          }

        } else {
          // ✅ Total section → full border
          data.cell.styles.lineWidth = 0.1;
          data.cell.styles.lineColor = [0, 0, 0];
        }

        // 🔥 Bold totals
        if (
          rowIndex >= lastRowIndex - 6 &&
          rowIndex <= lastRowIndex - 1 &&
          (colIndex === 5 || colIndex === 6)
        ) {
          data.cell.styles.fontStyle = 'bold';
        }

        // 🎨 Final row highlight
        if (rowIndex === lastRowIndex - 1) {
          data.cell.styles.fillColor = '#6fd32c';
          data.cell.styles.fontStyle = 'bold';
        }
      },

      didDrawPage: () => {
        header(doc);
        const pageNumber = doc.internal.getNumberOfPages();
        footer(doc, pageNumber, pageNumber);
      }
    });

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text('Bank Name:', 14, 243);
    doc.text(invoiceData.firmName.bankName, 65, 243);

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text('Account holder`s name:', 14, 251);
    doc.text(invoiceData.firmName.accountholdersname, 65, 251);

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text('Account Number:', 14, 259);
    const accountNumber = invoiceData.firmName?.bankAccountNo?.toString() || "";
    doc.text(accountNumber, 65, 259);

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text('IFSC Code:', 14, 268);
    doc.text(invoiceData.firmName.bankIfsc, 65, 268);

    const signatureYPosition = doc.internal.pageSize.height - 35;
    const signatureXPosition = doc.internal.pageSize.width - 60;
    const signatureLineLength = 50;
    const signatureLabelYPosition = signatureYPosition + 10;

    doc.setFontSize(11);
    doc.setTextColor('#ddd');
    doc.text("Signature", signatureXPosition + 17, signatureLabelYPosition);

    doc.setLineWidth(0.2);
    doc.line(signatureXPosition, signatureLabelYPosition + 5, signatureXPosition + signatureLineLength, signatureLabelYPosition + 5);

    // const blob = doc.output('blob');
    // const url = URL.createObjectURL(blob);
    // window.open(url);
    // this.loaderService.setLoader(false)
    const invoiceNo = invoiceData.invoiceNumber || 'Invoice';
    const partyName = invoiceData.partyName?.partyName || 'Party';
    const safePartyName = partyName.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `${invoiceNo}_${safePartyName}.pdf`;

    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);

    // ✅ Preview in new tab
    window.open(url, '_blank');

    // ✅ Download with filename
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    this.loaderService.setLoader(false);
  }

  generateCreditNotePDFDownload(creditNoteData: any) {
    this.loaderService.setLoader(true);
    const doc: any = new jsPDF();
    const hasRemarks = !!(creditNoteData.remarks && creditNoteData.remarks.trim());
    const header = (doc: any) => {
      doc.setFillColor('#fff');
      doc.rect(0, 0, doc.internal.pageSize.width, 10, 'F');
      const yPosition = 10;

      doc.setFillColor('#6fd32c');
      const rowHeight = 18;
      doc.rect(0, yPosition - rowHeight, doc.internal.pageSize.width, rowHeight, 'F');

      doc.setFontSize(12); doc.setTextColor(0, 0, 0); const verticalCenter = yPosition - rowHeight / 2 + 6;
      const phoneNumberLeft = `Mo. : ${creditNoteData.firmName.mobileNo}`; const leftXPosition = 10;
      doc.text(phoneNumberLeft, leftXPosition, verticalCenter, { align: 'left' });

      const phoneNumberMiddle = "Jay Shree Ganesh"; const middleXPosition = doc.internal.pageSize.width / 2;
      doc.text(phoneNumberMiddle, middleXPosition, verticalCenter, { align: 'center' });

      const borderYPosition = yPosition + 1;
      const topMargin = 0;
      const bottomMargin = 4;
      const logoYPosition = borderYPosition + topMargin;

      const imgData = '../../../../assets/images/logos/Green Orange Renewable Energy Company Logo_20250519_130127_0000.png';
      const imgWidth = 30;
      const imgHeight = 30;
      const xPosition = 7;
      doc.addImage(imgData, 'JPEG', xPosition, logoYPosition, imgWidth, imgHeight, undefined, 'FAST');

      const borderXPosition = xPosition + imgWidth + 10;
      const borderYStart = logoYPosition;
      const borderYEnd = logoYPosition + imgHeight;

      // Step 1: Add Firm Name (Bold & Centered)
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');

      const firmName = creditNoteData.firmName.header;
      const firmNameWidth = doc.getTextWidth(firmName);
      const firmNameX = (pageWidth - firmNameWidth) / 2;
      const firmNameY = 20; // Starting Y position

      doc.text(firmName, firmNameX, firmNameY);

      // Step 2: Add Subheader (Italic & Centered, below Firm Name)
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');

      const subHeader = creditNoteData.firmName.subHeader;
      const subHeaderWidth = doc.getTextWidth(subHeader);
      const subHeaderX = (pageWidth - subHeaderWidth) / 2;
      const subHeaderY = firmNameY + 8; // 8px gap below Firm Name

      doc.text(subHeader, subHeaderX, subHeaderY);

      // Step 3: Add Address (Centered Below Subheader, supports multiple lines)
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');

      const address = creditNoteData.firmName.address;
      const maxWidth = pageWidth - 70;
      const lineHeight = 5;
      const addressStartY = 35;

      const addressLines = doc.splitTextToSize(address, maxWidth);

      addressLines.forEach((line: string, index: number) => {
        doc.text(line, pageWidth / 1.8, addressStartY + (index * lineHeight), {
          align: 'center'
        });
      });
    };

    const lineTopYPosition = 43.7;
    doc.setLineWidth(0.3);
    doc.line(0, lineTopYPosition, doc.internal.pageSize.width, lineTopYPosition);

    doc.setFontSize(10);
    doc.setFillColor('#eee');
    const mobileNumberLeft = `GSTIN: ${creditNoteData.firmName.gstNo}`;
    const mobileNumberRight = `PAN: ${creditNoteData.firmName.panNo}`;

    const leftXPosition = 10;
    const yPosition = 50;
    const backgroundHeight = 9;

    doc.rect(0, yPosition - 6, doc.internal.pageSize.width, backgroundHeight, 'F');
    doc.text(mobileNumberLeft, leftXPosition, yPosition, { align: 'left' });
    doc.setFont(undefined, 'bold');
    doc.text(`Credit Note Without Stock`, doc.internal.pageSize.width / 2, yPosition, { align: 'center' });
    doc.setFont(undefined, 'normal');
    doc.text(mobileNumberRight, doc.internal.pageSize.width - 10, yPosition, { align: 'right' });

    const lineYPosition = yPosition + 3;

    doc.setLineWidth(0.3);
    doc.line(0, lineYPosition, doc.internal.pageSize.width, lineYPosition);

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const boxHeight = 35;
    const boxYPosition = 55;

    const box1Width = pageWidth * 0.75;
    const box1XPosition = 10;
    doc.setFillColor('#fff');
    doc.rect(box1XPosition, boxYPosition, box1Width, boxHeight, 'F');

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('GSTIN:', 10, 85);
    doc.text(creditNoteData.partyName.partyGstNo, 33, 85);
    doc.setLineWidth(0.3);
    doc.line(33, 87, 80, 87);

    const fieldsLeft = ["M/s:", "Address:"];

    const fieldsLeftValues = [
      `${creditNoteData.partyName.partyName}`,
      `${creditNoteData.partyName.partyAddress}`
    ];

    const leftYPosition = boxYPosition + 5;
    const boxWidth = doc.internal.pageSize.width * 0.63 - box1XPosition - 12;

    const labelXPosition = box1XPosition;
    const valueXPosition = box1XPosition + 24;

    let currentY = leftYPosition;

    fieldsLeft.forEach((field, index) => {
      let value = fieldsLeftValues[index];
      doc.text(field, labelXPosition, currentY);

      if (field === "Address:") {
        const splitAddress = doc.splitTextToSize(value, boxWidth);
        doc.text(splitAddress, valueXPosition, currentY);
        const lineHeight = 3;
        const totalHeight = splitAddress.length * lineHeight;

        const lineYPosition = currentY + totalHeight;
        doc.setLineWidth(0.3);
        doc.line(valueXPosition, lineYPosition, valueXPosition + boxWidth, lineYPosition);

        currentY += totalHeight + 6;
      } else {
        doc.text(value, valueXPosition, currentY);
        const lineYPosition = currentY + 1;
        doc.setLineWidth(0.3);
        doc.line(valueXPosition, lineYPosition, valueXPosition + boxWidth, lineYPosition);
        currentY += 9.5;
      }
    });

    const box2Width = pageWidth * 0.25;
    const box2XPosition = box1XPosition + box1Width + 5;
    doc.setFillColor('#fff');
    doc.rect(box2XPosition - 25, boxYPosition, box2Width, boxHeight, 'F');

    const formatDate = (date: any) => {
      if (!date) return '';
      const d = new Date(date);
      if (isNaN(d.getTime())) return String(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('TransPort Id:', 85, 85);
    doc.text(creditNoteData.TransPortName?.transPortId ?? "", 110, 85);
    doc.setLineWidth(0.3);
    doc.line(110, 87, 145, 87);

    const fieldsRight = ["Credit Note: ", "Date: ", "Invoice No: ", "PAN: "];
    const fieldsRightValues = [
      `${creditNoteData.creditNoteNumber}`,
      formatDate(creditNoteData.creditNoteDate),
      `${creditNoteData.invoiceNumber}`,
      `${creditNoteData.partyName.partyPanNo}`
    ];
    const rightYPosition = boxYPosition + 5;

    fieldsRight.forEach((field, index) => {
      const yPosition = rightYPosition + (index * 8.5);

      if (index === 0) {
        doc.setTextColor(255, 0, 0);
      } else {
        doc.setTextColor(0, 0, 0);
      }

      doc.text(field, box2XPosition - 25, yPosition);
      const textWidth = doc.getTextWidth(field);

      doc.setTextColor(0, 0, 0);

      if (index === 0 || index === 1) {
        doc.setFont(undefined, 'bold');
      }
      const valueXPosition = (box2XPosition - 28) + textWidth + 5;
      const valueYPosition = yPosition;
      doc.text(fieldsRightValues[index], valueXPosition, valueYPosition);

      if (index === 0 || index === 1) {
        doc.setFont(undefined, 'normal');
      }

      const lineYPosition = valueYPosition + 1;
      doc.setLineWidth(0.3);
      doc.line((box2XPosition - 25) + textWidth + 2, lineYPosition, (box2XPosition - 25) + box2Width, lineYPosition);
    });

    if (hasRemarks) {
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text('Reason:', 10, 95);
      doc.setFont(undefined, 'bold');
      doc.text(creditNoteData.remarks || '', 33, 95);
      doc.setFont(undefined, 'normal');
      doc.setLineWidth(0.3);
      doc.line(33, 97, 200, 97);
    }

    const columns = ["Sr", "Product", "HSNCode", "PO Number", "Qty", "Rate", "Amount"];
    const data: any = creditNoteData.products;
    const body: any = [];

    for (let i = 0; i < 10; i++) {
      let prodName = '';
      if (data[i]) {
        let p = data[i]?.productName;
        for (let j = 0; j < 3; j++) {
          if (p && typeof p === 'object') {
            p = p.productName;
          } else {
            break;
          }
        }
        prodName = typeof p === 'string' ? p : '';
      }
      const hasData = !!prodName;
      const row = [
        hasData ? i + 1 : '',
        prodName,
        hasData ? data[i]?.HSNCode : '',
        hasData ? (data[i]?.poNumber || '') : '',
        hasData ? `${Number(data[i]?.qty)}${data[i]?.measurementUnits ? ` (${data[i].measurementUnits})` : ''}` : '',
        hasData ? Number(data[i]?.price).toFixed(2) : '',
        hasData ? `${Number(data[i]?.finalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''
      ];
      body.push(row);
    }

    const productsSubTotal = creditNoteData.products.reduce((acc: any, product: any) => acc + product.finalAmount, 0);
    const discountAmount = (productsSubTotal * (creditNoteData.discount / 100));
    const discountedSubTotal = productsSubTotal - discountAmount;
    const sGstAmount = discountedSubTotal * (creditNoteData.sGST / 100);
    const cGstAmount = discountedSubTotal * (creditNoteData.cGST / 100);
    const finalAmount = discountedSubTotal + sGstAmount + cGstAmount;

    const formattedAmount = new Intl.NumberFormat('en-IN').format(parseFloat(productsSubTotal.toFixed(2)));
    const Amount = new Intl.NumberFormat('en-IN').format(parseFloat(finalAmount.toFixed(2)));
    const sGstAmountFormatted = sGstAmount.toFixed(2);
    const cGstAmountFormatted = cGstAmount.toFixed(2);
    const roundedAmount = Math.round(finalAmount);
    const formattedRoundedAmount = new Intl.NumberFormat('en-IN').format(roundedAmount);
    const finalAmountInWords = this.toWords.convert(Number(roundedAmount));

    body.push(
      ['', '', '', '', '', { content: 'Gross Total', styles: { halign: 'left' } }, `Rs. ${formattedAmount}`],
      ['', '', '', '', '', { content: `CGST ${creditNoteData.cGST}%` }, `Rs. ${cGstAmountFormatted}`],
      [{ content: `${finalAmountInWords}`, rowSpan: 3, colSpan: 5, styles: { halign: 'center', fontStyle: 'bold' } }, `SGST ${creditNoteData.sGST}%`, `Rs. ${sGstAmountFormatted}`],
      [{ content: 'Total Amount' }, `Rs. ${Amount}`, { styles: { FontFace: 'left' } }],
      [{ content: 'Final Amount' }, `Rs. ${formattedRoundedAmount}.00`, { styles: { FontFace: 'left' } }],
    );

    const footer = (doc: any, pageNumber: any, totalPages: any) => {
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Page ${pageNumber} of ${totalPages}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
      doc.line(10, doc.internal.pageSize.height - 15, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 15);
    };

    autoTable(doc, {
      head: [columns],
      body: body,
      startY: hasRemarks ? 103 : 95,
      theme: 'plain',
      margin: { top: 0, right: 10, bottom: 0, left: 10 },
      tableWidth: 'auto',
      headStyles: {
        fillColor: '#6fd32c',
        textColor: '#000',
        fontSize: 11,
        font: 'helvetica',
        fontStyle: 'bold',
        cellPadding: 3,
        lineWidth: 0.50
      },
      styles: {
        cellPadding: 2,
        lineWidth: 0,
      },
      didParseCell: (dataVal: any) => {
        const rowIndex = dataVal.row.index;
        const colIndex = dataVal.column.index;
        const rowData = body[rowIndex];

        const hasData = rowData && rowData[1] && rowData[1].toString().trim() !== '';
        const lastRowIndex = body.length;
        doc.setLineWidth(0.1);
        dataVal.cell.styles.lineColor = [0, 0, 0];
        const borderStart = hasRemarks ? 108 : 100;
        const borderEnd = hasRemarks ? 234 : 226;
        doc.setLineWidth(0.1);
        dataVal.cell.styles.lineColor = [0, 0, 0];
        doc.line(10, borderStart, 10, borderEnd);
        doc.setLineWidth(0.1);
        dataVal.cell.styles.lineColor = [0, 0, 0];
        doc.line(200, borderStart, 200, borderEnd);

        if (rowIndex < 10) {
          if (hasData) {
            dataVal.cell.styles.lineWidth = 0.1;
            dataVal.cell.styles.lineColor = [0, 0, 0];
          } else {
            dataVal.cell.styles.lineWidth = 0;
          }
        } else {
          dataVal.cell.styles.lineWidth = 0.1;
          dataVal.cell.styles.lineColor = [0, 0, 0];
        }

        if (
          rowIndex >= lastRowIndex - 6 &&
          rowIndex <= lastRowIndex - 1 &&
          (colIndex === 5 || colIndex === 6)
        ) {
          dataVal.cell.styles.fontStyle = 'bold';
        }

        if (rowIndex === lastRowIndex - 1) {
          dataVal.cell.styles.fillColor = '#6fd32c';
          dataVal.cell.styles.fontStyle = 'bold';
        }
      },
      didDrawPage: () => {
        header(doc);
        const pageNumber = doc.internal.getNumberOfPages();
        footer(doc, pageNumber, pageNumber);
      }
    });

    const bankDetailsYOffset = hasRemarks ? 8 : 0;

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text('Bank Name:', 14, 243 + bankDetailsYOffset);
    doc.text(creditNoteData.firmName.bankName, 65, 243 + bankDetailsYOffset);

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text('Account holder`s name:', 14, 251 + bankDetailsYOffset);
    doc.text(creditNoteData.firmName.accountholdersname, 65, 251 + bankDetailsYOffset);

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text('Account Number:', 14, 259 + bankDetailsYOffset);
    const accountNumber = creditNoteData.firmName?.bankAccountNo?.toString() || "";
    doc.text(accountNumber, 65, 259 + bankDetailsYOffset);

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text('IFSC Code:', 14, 268 + bankDetailsYOffset);
    doc.text(creditNoteData.firmName.bankIfsc, 65, 268 + bankDetailsYOffset);

    const signatureYPosition = doc.internal.pageSize.height - 35;
    const signatureXPosition = doc.internal.pageSize.width - 60;
    const signatureLineLength = 50;
    const signatureLabelYPosition = signatureYPosition + 10;

    doc.setFontSize(11);
    doc.setTextColor('#ddd');
    doc.text("Signature", signatureXPosition + 17, signatureLabelYPosition);

    doc.setLineWidth(0.2);
    doc.line(signatureXPosition, signatureLabelYPosition + 5, signatureXPosition + signatureLineLength, signatureLabelYPosition + 5);

    const cnNo = creditNoteData.creditNoteNumber || 'CreditNote';
    const partyName = creditNoteData.partyName?.partyName || 'Party';
    const safePartyName = partyName.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `${cnNo}_${safePartyName}.pdf`;

    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    this.loaderService.setLoader(false);
  }

  addTextWithFontSize(doc: any, text: any, x: any, y: any, fontSize: any) {
    const originalFontSize = doc.internal.getFontSize();
    doc.setFontSize(fontSize);
    doc.text(text, x, y);
    doc.setFontSize(originalFontSize);
  }


}
