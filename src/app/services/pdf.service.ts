// src/app/services/pdf-generator.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { customFont } from '../../assets/custom-font';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor() {}

  generatePDF(data: any[]) {
    const doc = new jsPDF();

    doc.addFileToVFS('customFont.ttf', customFont);
    doc.addFont('customFont.ttf', 'customFont', 'normal');
    doc.setFont('customFont');

    const col = ["Код", "ФИО", "Номер", "Адрес", "Комментарий"];
    const rows: any[] = [];

    data.forEach(item => {
      const temp = [item.clientCode, item.fio, item.phoneNumber, item.fullAdress, item.description];
      rows.push(temp);
    });

    autoTable(doc, {
      head: [col],
      body: rows,
      styles: {
        font: 'customFont'
      },
      columnStyles: {
        0: { cellWidth: 17 },
        1: { cellWidth: 30 },
        2: { cellWidth: 25 },
        3: { cellWidth: 50 }, // Set the width of the "Адрес" column (3rd column, index 2) to 50 units
      }
    });

    doc.save('Заявки.pdf');
  }
}
