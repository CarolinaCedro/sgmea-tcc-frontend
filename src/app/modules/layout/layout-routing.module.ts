import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'tecnicos',
    component: LayoutComponent,
    loadChildren: () => import('../tecnicos/tecnico.module').then((m) => m.TecnicoModule),
  },
  {
    path: 'gestor',
    component: LayoutComponent,
    loadChildren: () => import('../gestor/gestor.module').then((m) => m.GestorModule),
  },
  {
    path: 'chamado',
    component: LayoutComponent,
    loadChildren: () => import('../chamados/chamados.module').then((m) => m.ChamadosModule),
  },
  {
    path: 'departamento',
    component: LayoutComponent,
    loadChildren: () => import('../departamentos/departamento.module').then((m) => m.DepartamentoModule),
  },
  {
    path: 'especialidade',
    component: LayoutComponent,
    loadChildren: () => import('../especialidade/especialidade.module').then((m) => m.EspecialidadeModule),
  },
  {
    path: 'equipamento',
    component: LayoutComponent,
    loadChildren: () => import('../equipamento/equipamento.module').then((m) => m.EquipamentoModule),
  },
  {
    path: 'funcionario',
    component: LayoutComponent,
    loadChildren: () => import('../funcionario/funcionario.module').then((m) => m.FuncionarioModule),
  },
  {
    path: 'gestor',
    component: LayoutComponent,
    loadChildren: () => import('../gestor/gestor.module').then((m) => m.GestorModule),
  },

  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'error/404'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
