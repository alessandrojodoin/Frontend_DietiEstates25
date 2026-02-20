import { inject, Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { AuthService } from './auth.service';

(pdfMake as any).default.vfs = (pdfFonts as any).default.vfs;


@Injectable({
  providedIn: 'root'
})
export class ExportReportService {
  authService= inject(AuthService);

  exportCSV(totContratti: number, totVenduti: number, totAffittati: number, totOfferte: number, totVisualizzazioni: number, totPrenotazioni: number) {
    const rows = [
      ["Immobili Totali", "Immobili Venduti",  "Immobili Affittati", "Totale Offerte Ricevute", "Totale Visualizzazioni Immobili", "Totale Prenotazioni Ricevute"],
      [totContratti, totVenduti, totAffittati, totOfferte, totVisualizzazioni, totPrenotazioni]
    ];
  
   let csvContent = rows.map(e => e.join(";")).join("\n");

   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

   const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "report-immobiliare.csv";
    link.click();
    URL.revokeObjectURL(url);
}

exportPDF(
  totContratti: number,
  totVenduti: number,
  totAffittati: number,
  totOfferte: number,
  totVisualizzazioni: number,
  totPrenotazioni: number
) {

  const docDefinition: any = {
    content: [
      { text: `Report Immobiliare Agente ${this.authService.getUsername()}`, style: 'header' },
      { text: 'Statistiche Generali', style: 'subheader' },
      {
        table: {
          widths: ['*','*','*','*','*','*'],
          body: [
            [
              'Immobili Totali',
              'Venduti',
              'Affittati',
              'Totale Offerte',
              'Totale Visualizzazioni',
              'Totale Prenotazioni'
            ],
            [
              totContratti,
              totVenduti,
              totAffittati,
              totOfferte,
              totVisualizzazioni,
              totPrenotazioni
            ]
          ]
        }
      }
    ],
    styles: {
      header: {
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 14,
        margin: [0, 10, 0, 5]
      }
    }
  };

  (pdfMake as any).createPdf(docDefinition).download('report-immobiliare.pdf');
}


}
