import { NgModule } from '@angular/core';
import { PreloadAllModules ,Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  {
    path: 'create',loadChildren: './create/create.module#CreatePageModule'},
  { path: 'detail/:key', loadChildren: './detail/detail.module#DetailPageModule' },
  { path: 'edit/:key', loadChildren: './edit/edit.module#EditPageModule' },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }