import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FuncionarioListComponent} from "./funcionario-list/funcionario-list.component";
import {FuncionarioFormComponent} from "./funcionario-form/funcionario-form.component";


const routes: Routes = [
  {
    path: '',
    data: {
      roles: [],
    },
    children: [
      {
        path: '',
        component: FuncionarioListComponent,
      },
      {
        path: ':id',
        component: FuncionarioFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioRoutingModule {
}
