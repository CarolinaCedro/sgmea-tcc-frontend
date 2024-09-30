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


  user: User
  dashData: Dashboard

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
      'this-week': [1,2,3],
      'last-week': [2,4,5],
    },
  };

  taskDistributionWeekSelector = {
    value: 'this-week' as TaskDistributionKey // Certifique-se de que o valor é do tipo TaskDistributionKey
  };

  chartTaskDistribution: ApexOptions;
  data: any;


  constructor(private authservice: AuthService, private service: DasboardService, router: Router, route: ActivatedRoute) {
    this.authservice.userCurrent.subscribe(res => {
      this.user = res
    })

    this.service.getDashboardData().subscribe(res => {
      this.dashData = res
      console.log("result dashboard", res)
    })

    const selectedWeek = this.taskDistribution.series[this.taskDistributionWeekSelector.value] || [1, 2, 3, 6, 8];


    this.taskDistribution.overview["this-week"].new = this.dashData?.chartData?.thisWeek?.new
    this.taskDistribution.overview["completed"] = this.dashData?.chartData?.completed

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
      labels: [],
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
      series: selectedWeek,
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

  }


}
