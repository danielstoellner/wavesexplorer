import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit {
  stat: any;
  totalTransaction: any;
  stat1: any;
  avgBlocksize: any;
  stat2: any;
  transactionTypes: any;
  stat3: any;
  transactionsPerBlock: any;

  constructor() {
  }

  ngOnInit() {
    this.generateStatistics();
  }

  generateStatistics() {
    // Total Transactions
    this.stat = document.getElementById('totalTransactions');
    this.totalTransaction = this.stat.getContext('2d');
    const totalTransactions = new Chart(this.totalTransaction, {
      type: 'line',
      data: {
        labels: ['May 16', 'Jun 16', 'Jul 16', 'Aug 16', 'Sep 16', 'Oct 16', 'Nov 16', 'Dec 16', 'Jan 17', 'Feb 17', 'Mar 17', 'Apr 17', 'May 17', 'Jun 17', 'Jul 17', 'Aug 17', 'Sep 17', 'Oct 17', 'Nov 17', 'Dec 17', 'Jan 18'],
        datasets: [{
          label: 'Total Transactions',
          data: [1000, 1500, 2100, 2700, 3000, 4000, 4900, 6000, 7100, 8400, 10000, 13000, 20000, 50000, 90000, 300000, 1000000, 5000000, 6000000, 7000000, 8000000],
          backgroundColor: 'rgba(123, 209, 106, 0.1)',
          borderColor: 'rgba(123, 209, 106, 1)'
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });

    // AVG Blocksize
    this.stat1 = document.getElementById('AVGBlocksize');
    this.avgBlocksize = this.stat1.getContext('2d');
    const AVGBlocksize = new Chart(this.avgBlocksize, {
      type: 'line',
      data: {
        labels: ['May 16', 'Jun 16', 'Jul 16', 'Aug 16', 'Sep 16', 'Oct 16', 'Nov 16', 'Dec 16', 'Jan 17', 'Feb 17', 'Mar 17', 'Apr 17', 'May 17', 'Jun 17', 'Jul 17', 'Aug 17', 'Sep 17', 'Oct 17', 'Nov 17', 'Dec 17', 'Jan 18'],
        datasets: [{
          label: 'Avg. Blocksize',
          data: [0.1, 0.4, 0.3, 0.5, 0.5, 0.6, 0.6, 0.8, 0.6, 0.7, 0.8, 0.8, 0.9, 0.7, 0.5, 0.6, 0.7, 0.75, 0.9, 1, 1.3],
          backgroundColor: 'rgba(123, 209, 106, 0.1)',
          borderColor: 'rgba(123, 209, 106, 1)'
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });

    // Transaction Types
    this.stat2 = document.getElementById('transactionTypes');
    this.transactionTypes = this.stat2.getContext('2d');
    const transactionTypes = new Chart(this.transactionTypes, {
      type: 'doughnut',
      data: {
        labels: ['Genesis', 'Payment', 'Issue', 'Transfer', 'Reissue', 'Burn', 'Exchange', 'Lease', 'Lease cancel', 'Create alias', ' Make asset name unique'],
        datasets: [{
          label: 'Avg. Blocksize',
          data: [5, 5, 10, 60, 2, 2, 6, 1, 3, 3, 3],
          backgroundColor: ['rgba(193, 66, 66, 0.6)',
            'rgba(191, 112, 63, 0.6)',
            'rgba(191, 189, 63, 0.6)',
            'rgba(131, 191, 63, 0.6)',
            'rgba(63, 191, 74, 0.6)',
            'rgba(63, 191, 150, 0.6)',
            'rgba(63, 174, 191, 0.6)',
            'rgba(63, 108, 191, 0.6)',
            'rgba(65, 63, 191, 0.6)',
            'rgba(110, 63, 191, 0.6)',
            'rgba(191, 63, 187, 0.6)']
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });

    // Transactions per Block
    this.stat3 = document.getElementById('transactionsPerBlock');
    this.transactionsPerBlock = this.stat3.getContext('2d');
    const transactionsPerBlock = new Chart(this.transactionsPerBlock, {
      type: 'line',
      data: {
        labels: ['May 16', 'Jun 16', 'Jul 16', 'Aug 16', 'Sep 16', 'Oct 16', 'Nov 16', 'Dec 16', 'Jan 17', 'Feb 17', 'Mar 17', 'Apr 17', 'May 17', 'Jun 17', 'Jul 17', 'Aug 17', 'Sep 17', 'Oct 17', 'Nov 17', 'Dec 17', 'Jan 18'],
        datasets: [{
          label: 'Transactions per Block',
          data: [5, 50, 99, 30, 45, 20, 80, 90, 69, 27, 60, 80, 100, 90, 40, 60, 50, 95, 80, 50, 87],
          backgroundColor: 'rgba(123, 209, 106, 0.1)',
          borderColor: 'rgba(123, 209, 106, 1)'
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });

  }
}
