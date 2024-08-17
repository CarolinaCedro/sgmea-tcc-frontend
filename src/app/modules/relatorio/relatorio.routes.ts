import {Routes} from '@angular/router';
import {RelatorioFormComponent} from "./relatorio-form/relatorio-form.component";
import {RelatorioListComponent} from "./relatorio-list/relatorio-list.component";


export default [
  {
    path: '',
    component: RelatorioListComponent,
  },

  {
    path: ':id',
    component: RelatorioFormComponent,
  },
] as Routes;
