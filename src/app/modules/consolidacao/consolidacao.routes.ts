import {Routes} from '@angular/router';
import {ConsolidacaoListComponent} from "./consolidacao-list/consolidacao-list.component";
import {ConsolidacaoFormComponent} from "./consolidacao-form/consolidacao-form.component";


export default [
  {
    path: '',
    component: ConsolidacaoListComponent,
  },

  {
    path: ':id',
    component: ConsolidacaoFormComponent,
  },
] as Routes;
