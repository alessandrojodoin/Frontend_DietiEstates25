import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

(pdfMake as any).vfs = (pdfFonts as any).vfs;


@Injectable({
  providedIn: 'root'
})
export class ExportReportService {

  exportCSV() {
    const rows = [
      ["Immobili Totali", "Venduti", "Affittati", "Visualizzazioni Totali"],
      [53, 12, 8, 1284]
    ];
  
   let csvContent = rows.map(e => e.join(",")).join("\n");

   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

   const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "report-immobiliare.csv";
    link.click();
    URL.revokeObjectURL(url);
}


/*exportPDF() {
  const docDefinition = {
    content: [
      { text: 'Report Immobiliare', style: 'header' },
      { text: 'Statistiche generali', style: 'subheader' },
      {
        table: {
          body: [
            ['Immobili Totali', 'Venduti', 'Affittati', 'Visualizzazioni Totali'],
            ['53', '12', '8', '1284']
          ]
        }
      }
    ],
    styles: {
      header: { fontSize: 20, bold: true },
      subheader: { fontSize: 14, margin: [0, 10, 0, 5] }
    }
  };

  pdfMake.createPdf(docDefinition).download('report_immobiliare.pdf');
}*/



}
