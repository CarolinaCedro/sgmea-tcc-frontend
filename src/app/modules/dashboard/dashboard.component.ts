import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatButtonToggle, MatButtonToggleGroup, MatButtonToggleModule} from "@angular/material/button-toggle";
import {ApexOptions, NgApexchartsModule} from "ng-apexcharts";

// Define um tipo para as chaves de semana
type TaskDistributionKey = 'this-week' | 'last-week';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [RouterOutlet, NgApexchartsModule, MatButtonToggleModule],
})
export class DashboardComponent implements OnInit {

  taskDistribution = {
    overview: {
      'this-week': {
        new: 594,
        completed: 287,
      },
      'last-week': {
        new: 526,
        completed: 260,
      },
    },
    labels: ['API', 'Backend', 'Frontend', 'Issues'],
    series: {
      'this-week': [15, 20, 38, 27],
      'last-week': [19, 16, 42, 23],
    },
  };

  taskDistributionWeekSelector = {
    value: 'this-week' as TaskDistributionKey // Certifique-se de que o valor é do tipo TaskDistributionKey
  };

  chartTaskDistribution: ApexOptions | any = {};
  data: any;

  constructor() {
    this.chartTaskDistribution = {

      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'polarArea',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      labels: this.taskDistribution.labels,
      legend: {
        position: 'bottom',
      },
      plotOptions: {
        polarArea: {
          spokes: {
            connectorColors: '#e2e8f0',
          },
          rings: {
            strokeColor: '#e2e8f0',
          },
        },
      },
      series: this.taskDistribution.series[this.taskDistributionWeekSelector.value],
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.75,
          },
        },
      },
      stroke: {
        width: 2,
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#93C5FD',
          shadeIntensity: 0.75,
          shadeTo: 'dark',
        },
      },
      tooltip: {
        followCursor: true,
        theme: 'dark',
      },
      yaxis: {
        labels: {
          style: {
            colors: '#64748b',
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this._prepareChartData();
  }

  private _prepareChartData(): void {

  }

  get taskDistributionOverview() {
    // Utilize o tipo TaskDistributionKey para acessar a chave
    const key = this.taskDistributionWeekSelector.value as TaskDistributionKey;
    return this.taskDistribution.overview[key] || {new: 0, completed: 0};
  }
}
