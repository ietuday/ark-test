import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'dashboard',
    loadChildren: () => import('./module/dashboard/dashboard.module').then(res => res.DashboardModule)
  },
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
