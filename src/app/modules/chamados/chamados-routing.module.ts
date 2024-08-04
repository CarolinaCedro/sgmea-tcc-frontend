import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChamadosListComponent} from "./chamados-list/chamados-list.component";
import {ChamadosFormComponent} from "./chamados-form/chamados-form.component";


const routes: Routes = [
  {
    path: '',
    data: {
      roles: [],
    },
    children: [
      {
        path: '',
        component: ChamadosListComponent,
      },
      {
        path: ':id',
        component: ChamadosFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChamadosRoutingModule {
}
