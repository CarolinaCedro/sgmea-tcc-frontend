import {Routes} from '@angular/router';
import {GestorListComponent} from "./gestor-list/gestor-list.component";
import {GestorFormComponent} from "./gestor-form/gestor-form.component";


export default [
  {
    path: '',
    component: GestorListComponent,
  },

  {
    path: ':id',
    component: GestorFormComponent,
  },
] as Routes;
