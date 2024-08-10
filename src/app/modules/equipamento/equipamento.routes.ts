import {Routes} from '@angular/router';
import {EquipamentoListComponent} from "./equipamento-list/equipamento-list.component";
import {EquipamentoFormComponent} from "./equipamento-form/equipamento-form.component";


export default [
  {
    path: '',
    component: EquipamentoListComponent,
  },

  {
    path: ':id',
    component: EquipamentoFormComponent,
  },
] as Routes;
