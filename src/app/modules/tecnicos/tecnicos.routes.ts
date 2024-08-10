import {Routes} from '@angular/router';
import {TecnicosListComponent} from "./tecnicos-list/tecnicos-list.component";
import {TecnicosFormComponent} from "./tecnicos-form/tecnicos-form.component";


export default [
  {
    path: '',
    component: TecnicosListComponent,
  },

  {
    path: ':id',
    component: TecnicosFormComponent,
  },
] as Routes;
