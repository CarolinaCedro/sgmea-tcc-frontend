import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TecnicosListComponent } from './tecnicos-list/tecnicos-list.component';
import { TecnicosFormComponent } from './tecnicos-form/tecnicos-form.component';


const routes: Routes = [
  {
    path: '',
    data: {
      roles: [],
    },
    children: [
      {
        path: '',
        component: TecnicosListComponent,
      },
      {
        path: ':id',
        component: TecnicosFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TecnicosRoutingModule {
}
