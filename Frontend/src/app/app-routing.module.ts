import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MyResComponent } from './my-res/my-res.component';
import { TableViewComponent } from './table-view/table-view.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login', component: LoginPageComponent},
  {path:'home', component: HomePageComponent,
  children:[
    {path:'table-view', component: TableViewComponent},
    {path:'my-res', component: MyResComponent},
    {path:'admin-panel', component: AdminPanelComponent,
      children:[
          {path:'add-user', component: AddUserComponent},
          {path:'edit-user', component: EditUserComponent}]
      }
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
