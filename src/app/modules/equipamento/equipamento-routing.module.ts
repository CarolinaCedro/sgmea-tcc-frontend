import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EquipamentoListComponent} from "./equipamento-list/equipamento-list.component";
import {EquipamentoFormComponent} from "./equipamento-form/equipamento-form.component";


const routes: Routes = [
  {
    path: '',
    data: {
      roles: [],
    },
    children: [
      {
        path: '',
        component: EquipamentoListComponent,
      },
      {
        path: ':id',
        component: EquipamentoFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipamentoRoutingModule {
}
