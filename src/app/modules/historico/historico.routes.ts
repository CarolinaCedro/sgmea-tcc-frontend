import {Routes} from '@angular/router';
import {HistoricoListComponent} from "./historico-list/historico-list.component";
import {HistoricoFormComponent} from "./historico-form/historico-form.component";


export default [
  {
    path: '',
    component: HistoricoListComponent,
  },

  {
    path: ':id',
    component: HistoricoFormComponent,
  },
] as Routes;
