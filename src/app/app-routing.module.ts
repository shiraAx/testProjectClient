import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';

const routes: Routes = [
  {path:"guidelines",component:GuidelinesComponent},
  {path:"addUser",component:AddUserComponent},
  {path:"",component:GuidelinesComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
