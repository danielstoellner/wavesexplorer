import {Component, OnInit} from '@angular/core';
import * as Chart from 'chart.js';
import {HttpClient} from '@angular/common/http';
import {DataBlock} from './datablock';
import {SelectItem} from 'primeng/api';


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

  selectedTime: any;
  timeframe: string;
  times: SelectItem[];

  statistics: DataBlock[];

  url: string;

  /* -------------------------------------
    Vars for chart data
   --------------------------------------- */

  totalTransactionValues: number[] = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
  avgBlockSizeValues: number[] = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
  transactionTypeValues: number[] = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
  avgTransactionsPerBlockValues: number[] = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
  labelValues: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  constructor(private  httpClient: HttpClient) {
    this.url  = 'http://localhost:8080/statistics/';
    this.timeframe  = 'Year';
    this.times = [];
    this.times.push({label: 'all', value: 'all'});
    this.times.push({label: 'Year', value: 'Year'});
    this.times.push({label: 'Month', value: 'Month'});
    this.times.push({label: 'Week', value: 'Week'});
    this.selectedTime = this.times.find(x => x.value.code === 'Year');
  }

  ngOnInit() {
    setTimeout(() => {
      this.getDataBlocks().then(
        () => this.setValueTypes().then(
          () => this.setValueTotal().then(
            () => this.generateStatistics().then(
              () => this.generateStatistics()))));
    }, 2000);
  }

  refresh() {
    this.timeframe = this.selectedTime;
    setTimeout(() => {
      this.getDataBlocks().then(
        () => this.setValueTypes().then(
          () => this.setValueTotal().then(
            () => this.generateStatistics().then(
              () => this.generateStatistics()))));
    }, 2000);
  }

  async getDataBlocks() {
    // This line took about 892309years of my life to figure out ;(
    const result: DataBlock[] = await this.httpClient.get<DataBlock[]>(this.url + 'get' + this.timeframe).toPromise();

    if (result.length !== 0) {
      this.statistics = result;
    } else {
      this.statistics = [new DataBlock()];
    }
  }

  async setValueTypes() {

    this.transactionTypeValues = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ];
    const statVal = this.statistics;
    // Set value of transactions per type
    statVal.forEach(value => {
      this.transactionTypeValues[0] += value[4];
      this.transactionTypeValues[1] += value[5];
      this.transactionTypeValues[2] += value[6];
      this.transactionTypeValues[3] += value[7];
      this.transactionTypeValues[4] += value[8];
      this.transactionTypeValues[5] += value[9];
      this.transactionTypeValues[6] += value[10];
      this.transactionTypeValues[7] += value[11];
      this.transactionTypeValues[8] += value[12];
      this.transactionTypeValues[9] += value[13];
      this.transactionTypeValues[10] += value[14];
    });
  }

  async setValueTotal() {

    const statVal = this.statistics;
    // Set value of total transactions
    let nrOfLabels = 0;
    let divider = 0;

    switch (this.timeframe) {
      case 'Year':
        nrOfLabels = 12;
        divider = statVal.length / nrOfLabels;
        this.labelValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.totalTransactionValues = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
        this.avgTransactionsPerBlockValues = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
        this.avgBlockSizeValues = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
        break;
      case 'Month':
        nrOfLabels = 4;
        divider = statVal.length / nrOfLabels;
        this.labelValues = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        this.totalTransactionValues = [0, 0 , 0 , 0 ];
        this.avgTransactionsPerBlockValues = [0, 0 , 0 , 0 ];
        this.avgBlockSizeValues = [0, 0 , 0 , 0 ];
        break;
      case 'Week':
        nrOfLabels = 7;
        divider = statVal.length / nrOfLabels;
        this.labelValues = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.totalTransactionValues = [0, 0 , 0 , 0 , 0 , 0 , 0 ];
        this.avgTransactionsPerBlockValues = [0, 0 , 0 , 0 , 0 , 0 , 0 ];
        this.avgBlockSizeValues = [0, 0 , 0 , 0 , 0 , 0 , 0 ];
        break;
      case 'all':
        nrOfLabels = 12;
        divider = statVal.length / nrOfLabels;
        this.labelValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.totalTransactionValues = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
        this.avgTransactionsPerBlockValues = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
        this.avgBlockSizeValues = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
        break;
      default:
        nrOfLabels = 12;
        divider = statVal.length / nrOfLabels;
        this.labelValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.totalTransactionValues = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
        this.avgTransactionsPerBlockValues = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
        this.avgBlockSizeValues = [0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
        break;
    }

    const beginn = this.statistics[0][0];
    const blockAmount = 99;

    statVal.forEach(value => {
      this.totalTransactionValues[Math.round((value[0] - beginn) / divider)] += value[3];
      this.avgBlockSizeValues[Math.round((value[0] - beginn) / divider)] += Math.round( value[1] / blockAmount );
      this.avgTransactionsPerBlockValues[Math.round((value[0] - beginn) / divider)] += Math.round( value[3] / blockAmount );
    });

    console.log('Finished loading total transactions');

  }

  async generateStatistics() {

    this.stat = document.getElementById('totalTransactions');
    this.totalTransaction = this.stat.getContext('2d');

    const totalTransactions = new Chart(this.totalTransaction, {
      type: 'line',
      data: {
        labels: this.labelValues,
        datasets: [{
          label: 'Total Transactions',
          data: this.totalTransactionValues,
          backgroundColor: 'rgba(123, 209, 106, 0.1)',
          borderColor: 'rgba(123, 209, 106, 1)'
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });

    /**
     * Liefert die Durchschnittlichen Blockgrößen je Monat zurück
     * @type {HTMLElement | null}
     */
    // AVG Blocksize
    this.stat1 = document.getElementById('AVGBlocksize');
    this.avgBlocksize = this.stat1.getContext('2d');

    const AVGBlocksize = new Chart(this.avgBlocksize, {
      type: 'line',
      data: {
        labels: this.labelValues,
        datasets: [{
          label: 'Avg. Blocksize',
          data: this.avgBlockSizeValues,
          backgroundColor: 'rgba(123, 209, 106, 0.1)',
          borderColor: 'rgba(123, 209, 106, 1)'
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });

    // Transaction Types>
    /**
     * Liefert Statistiken zu verschiedenen Transaktionstypen zurück
     * @type {HTMLElement | null}
     */
    this.stat2 = document.getElementById('transactionTypes');
    this.transactionTypes = this.stat2.getContext('2d');

    const transactionTypes = new Chart(this.transactionTypes, {
      type: 'doughnut',
      data: {
        labels: ['Genesis (1)', 'Payment (2)', 'Issue (3)', 'Transfer (4)'
          , 'Reissue (5)', 'Burn (6)', 'Exchange (7)', 'Lease (8)', 'Lease cancel (9)'
          , 'Create alias (10)', ' Make asset name unique (11)'],
        datasets: [{
          label: 'Avg. Blocksize',
          data: this.transactionTypeValues,
          // data: [5, 5, 10, 60, 2, 2, 6, 1, 3, 3, 3],
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
    /**
     * Liefert Statistiken zu Transaktionen per Block
     * @type {HTMLElement | null}
     */
    this.stat3 = document.getElementById('transactionsPerBlock');
    this.transactionsPerBlock = this.stat3.getContext('2d');
    const transactionsPerBlock = new Chart(this.transactionsPerBlock, {
      type: 'line',
      data: {
        labels: this.labelValues,
        datasets: [{
          label: 'Transactions per Block',
          data: this.avgTransactionsPerBlockValues,
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
