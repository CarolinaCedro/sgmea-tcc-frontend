import {Routes} from '@angular/router';
import {ChamadosListComponent} from "./chamados-list/chamados-list.component";
import {ChamadosFormComponent} from "./chamados-form/chamados-form.component";


export default [
  {
    path: '',
    component: ChamadosListComponent,
  },

  {
    path: ':id',
    component: ChamadosFormComponent,
  },
] as Routes;
