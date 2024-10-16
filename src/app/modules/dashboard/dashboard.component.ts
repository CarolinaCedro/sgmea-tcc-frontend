import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ApexOptions, NgApexchartsModule} from "ng-apexcharts";
import {AuthService} from "../../core/auth/service/auth/auth.service";
import {User} from "../../model/user";
import {DasboardService} from "./service/dasboard.service";
import {Dashboard} from "./model/dasboard.model";

// Define um tipo para as chaves de semana
type TaskDistributionKey = 'this-week' | 'last-week';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [RouterOutlet, NgApexchartsModule, MatButtonToggleModule],
})
export class DashboardComponent implements OnInit {

  user: User;
  dashData: Dashboard;

  taskDistribution = {
    overview: {
      'this-week': {
        new: 0,
        completed: 0,
      },
      'last-week': {
        new: 0,
        completed: 0,
      },
    },
    labels: ['', '', '', ''],
    series: {
      'this-week': [1, 2, 3],
      'last-week': [2, 4, 5],
    },
  };

  taskDistributionWeekSelector = {
    value: 'this-week' as TaskDistributionKey // Certifique-se de que o valor é do tipo TaskDistributionKey
  };

  chartTaskDistribution: ApexOptions;
  data: any;

  constructor(private authservice: AuthService, private service: DasboardService, router: Router, route: ActivatedRoute) {
    // Subscreve ao usuário atual
    this.authservice.userCurrent.subscribe(res => {
      this.user = res;
    });

    // Subscreve aos dados do dashboard
    this.service.getDashboardData().subscribe(res => {
      this.dashData = res;
      console.log("result dashboard", res);

      // Atualiza os dados de distribuição de tarefas com os dados recebidos
      this.taskDistribution.overview["this-week"].new = this.dashData?.chartData?.thisWeek?.new || 0;
      this.taskDistribution.overview["this-week"].completed = this.dashData?.chartData?.thisWeek?.completed || 0;
      this.taskDistribution.overview["last-week"].new = this.dashData?.chartData?.lastWeek?.new || 0;
      this.taskDistribution.overview["last-week"].completed = this.dashData?.chartData?.lastWeek?.completed || 0;

      // Atualiza o gráfico com base nos novos dados
      const selectedWeek = this.taskDistribution.series[this.taskDistributionWeekSelector.value] || [1, 2, 3];
      this.updateChart(selectedWeek);
    });

    // Inicializa o gráfico com valores padrão
    const selectedWeek = this.taskDistribution.series[this.taskDistributionWeekSelector.value] || [1, 2, 3];
    this.updateChart(selectedWeek);
  }

  ngOnInit(): void {}

  // Função para atualizar o gráfico de distribuição de tarefas
  private updateChart(seriesData: number[]) {
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
      series: seriesData, // Passa os dados atualizados
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
}
