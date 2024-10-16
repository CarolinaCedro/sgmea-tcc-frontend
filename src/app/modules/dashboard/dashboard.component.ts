import { Component, OnInit, Inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import {ApexOptions, NgApexchartsModule} from 'ng-apexcharts';
import { AuthService } from "../../core/auth/service/auth/auth.service";
import {Dashboard} from "./model/dasboard.model";
import {DasboardService} from "./service/dasboard.service";

// Definir tipo de chave de semana
type TaskDistributionKey = 'this-week' | 'last-week';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;
  dashData: Dashboard;
  taskDistribution = {
    overview: {
      'this-week': { new: 0, completed: 0 },
      'last-week': { new: 0, completed: 0 },
    },
    labels: ['', '', '', ''],
    series: {
      'this-week': [1, 2, 3],
      'last-week': [2, 4, 5],
    },
  };
  taskDistributionWeekSelector = { value: 'this-week' as TaskDistributionKey };
  chartTaskDistribution: ApexOptions;

  constructor(
    private authservice: AuthService,
    private service: DasboardService,
    @Inject(Platform) private platform: Platform // Injeção do Platform
  ) {
    if (this.platform.isBrowser) {
      this.loadChart(); // Carregar gráfico apenas no navegador
    }

    this.authservice.userCurrent.subscribe(res => {
      this.user = res;
    });

    this.service.getDashboardData().subscribe(res => {
      this.dashData = res;
      console.log("Result Dashboard", res);
      if (this.platform.isBrowser) {
        this.updateChartData();
      }
    });
  }

  ngOnInit(): void {}

  loadChart(): void {
    // Agora que sabemos que está no navegador, podemos carregar o gráfico
    this.chartTaskDistribution = {
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'polarArea',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      labels: [],
      legend: { position: 'bottom' },
      plotOptions: {
        polarArea: {
          spokes: { connectorColors: '#e2e8f0' },
          rings: { strokeColor: '#e2e8f0' },
        },
      },
      series: this.taskDistribution.series['this-week'], // ou conforme a lógica
      states: { hover: { filter: { type: 'darken', value: 0.75 } } },
      stroke: { width: 2 },
      theme: {
        monochrome: { enabled: true, color: '#93C5FD', shadeIntensity: 0.75, shadeTo: 'dark' },
      },
      tooltip: { followCursor: true, theme: 'dark' },
      yaxis: { labels: { style: { colors: '#64748b' } } },
    };
  }

  updateChartData(): void {
    const selectedWeek = this.taskDistribution.series[this.taskDistributionWeekSelector.value] || [1, 2, 3, 6, 8];
    this.chartTaskDistribution.series = selectedWeek;
  }
}
