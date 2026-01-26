import { Component, OnInit } from '@angular/core';
import { PayoutService } from '../services/payout.service';
import { PaymentService } from '../../products/Services/payment.service';

@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
  styleUrls: ['./payouts.component.css']
})
export class PayoutsComponent implements OnInit {

  payouts: any[] = [
    {
      seller: { firstName: 'Ahmed' },
      amount: 1250.000,
      generatedAt: new Date('2026-01-20T10:30:00'),
      itemsSold: 'Iphone 15 (x2), Coque Silicone'
    },
    {
      seller: { firstName: 'Sonia' },
      amount: 450.500,
      generatedAt: new Date('2026-01-22T14:15:00'),
      itemsSold: 'Lenovo Legion Mouse, Tapis'
    }
  ];

  constructor(
    private payoutService: PayoutService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.getPayouts();
  }

  getPayouts() {
    this.payoutService.getPendingPayouts().subscribe((data) => {
      this.payouts = data;
      console.log('Payouts fetched:', data);
    });
  }

  exportCsv() {
    this.paymentService.extractPayouts().subscribe({
      next: (data) => {
        console.log('CSV data received:', data);
        const blob = new Blob([data], { type: 'text/csv' });
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'payouts.csv';
        link.click();
        window.URL.revokeObjectURL(downloadURL);
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement', err);
        alert('Impossible de générer le CSV. Vérifiez votre connexion.');
      }
    });
  }

}
