import {Routes} from '@angular/router';
import {LayoutComponent} from "./modules/layout/layout.component";
import {AuthGuardRouterNoSecurityService} from "./core/guards/security/auth-guard-router-no-security.service";
import {AuthGuardRouterSecurityService} from "./core/guards/security/auth-guard-router-security.service";

export const routes: Routes = [


  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home/dashboard',
  },

  {
    path: "auth",
    loadChildren: () => import('../app/core/auth/auth.routes'),
    canActivate: [AuthGuardRouterNoSecurityService]
  },

  {
    path: 'home',
    canActivate: [AuthGuardRouterSecurityService],
    component: LayoutComponent,
    children: [

      {
        path: 'dashboard',
        loadChildren: () => import('../app/modules/dashboard/dasboard.routes')
      },

      {
        path: 'chamados',
        loadChildren: () => import('../app/modules/chamados/chamados.routes')
      },

      {
        path: 'departamentos',
        loadChildren: () => import('../app/modules/departamentos/departamentos.routes')
      },
      {
        path: 'equipamentos',
        loadChildren: () => import('../app/modules/equipamento/equipamento.routes')
      },
      {
        path: 'especialidade',
        loadChildren: () => import('../app/modules/especialidade/especialidade.routes')
      },
      {
        path: 'funcionario',
        loadChildren: () => import('../app/modules/funcionario/funcionario.routes')
      },
      {
        path: 'gestor',
        loadChildren: () => import('../app/modules/gestor/gestor.routes')
      },
      {
        path: 'tecnico',
        loadChildren: () => import('../app/modules/tecnicos/tecnicos.routes')
      },
      {
        path: 'chamados',
        loadChildren: () => import('../app/modules/chamados/chamados.routes')
      },
      {
        path: 'priorizao-chamado',
        loadChildren: () => import('../app/modules/priorizao-chamado/priorizao-chamado.routes')
      },
      {
        path: 'relatorio',
        loadChildren: () => import('../app/modules/relatorio/relatorio.routes')
      },
      {
        path: 'historico',
        loadChildren: () => import('../app/modules/historico/historico.routes')
      },
    ]
  }

];
