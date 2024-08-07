import {Routes} from '@angular/router';
import {LayoutComponent} from "./modules/layout/layout.component";

export const routes: Routes = [


  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home/dashboard',
  },

  {
    path: "auth",
    loadChildren: () => import('../app/modules/auth/auth.routes'),
    // canActivate: [AuthGuardRouterNoSecurityService]
  },

  {
    path: 'home',
    // canActivate: [AuthGuardRouterSecurityService],
    component: LayoutComponent,
    children: [

      {
        path: 'dashboard',
        loadChildren: () => import('../app/modules/dashboard/dasboard.routes')
      },


    ]
  }

];
