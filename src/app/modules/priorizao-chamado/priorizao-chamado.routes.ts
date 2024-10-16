import {Routes} from '@angular/router';
import {PriorizaocaoChamadoListComponent} from "./priorizaocao-chamado-list/priorizaocao-chamado-list.component";
import {PriorizaocaoChamadoFormComponent} from "./priorizaocao-chamado-form/priorizaocao-chamado-form.component";


export default [
  {
    path: '',
    component: PriorizaocaoChamadoListComponent,
  },

  {
    path: ':id',
    component: PriorizaocaoChamadoFormComponent,
  },
] as Routes;
