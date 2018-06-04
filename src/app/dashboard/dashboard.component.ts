import { Component, OnInit } from '@angular/core';
import {Block, BlockHeight } from '../blocks/block';
import {WavesApiService} from '../common/waves-api.service';
import * as Chart from 'chart.js';
import {StatisticsComponent} from '../statistics/statistics.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private height: number;
  blocks: Block[];
  stacked: boolean;
  stat1: any;
  avgBlocksize: any;

  constructor(
    private wavesApiService: WavesApiService
  ) { }

  ngOnInit() {
    this.getHeight();
    this.generateStatistic();
  }

  generateStatistic() {
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
        responsive: true,
        display: true
      }
    });
  }

  async getHeight() {
    const result: BlockHeight = await this.wavesApiService.getHeight();
    this.height = result.height;
    this.getBlockFromTo();
  }

  async getBlockFromTo() {
    const result: Block[] = await this.wavesApiService.getBlockFromTo(this.height - 4, this.height);
    this.blocks = result;
  }
}
