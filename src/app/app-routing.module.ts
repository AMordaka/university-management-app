import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './guards/auth.guard';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {UserListComponent} from './user-list/user-list.component';
import {ItemListComponent} from './item-list/item-list.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AdminGuard} from './guards/admin.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user-list', component: UserListComponent, canActivate: [AdminGuard]},
  {path: 'item-list', component: ItemListComponent, canActivate: [AuthGuard]},
  {path: 'profile/:username', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
