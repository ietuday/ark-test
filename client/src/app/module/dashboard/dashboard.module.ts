import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/shared.module';
import { UserCardComponent } from './user-card/user-card.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
  path: '',
  component: UserListComponent,
  },
  {
    path:'**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [
    UserListComponent, 
    UserCardComponent, 
    AddUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents:[AddUserComponent]
})
export class DashboardModule { }
