import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DepartamentoListComponent} from "./departamento-list/departamento-list.component";
import {DepartamentoFormComponent} from "./departamento-form/departamento-form.component";


const routes: Routes = [
  {
    path: '',
    data: {
      roles: [],
    },
    children: [
      {
        path: '',
        component: DepartamentoListComponent,
      },
      {
        path: ':id',
        component: DepartamentoFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartamentosRoutingModule {
}
