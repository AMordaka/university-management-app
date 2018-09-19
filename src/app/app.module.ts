import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTableModule } from 'angular-6-datatable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { ModalComponent } from './modal/modal.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AlertComponent } from './directives/alert/alert.component';
import { UserListComponent } from './user-list/user-list.component';
import { AdminGuard } from './guards/admin.guard';
import { ItemListComponent } from './item-list/item-list.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ModalItemComponent } from './modal-item/modal-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    AlertComponent,
    UserListComponent,
    ModalComponent,
    ItemListComponent,
    ModalRegisterComponent,
    UserProfileComponent,
    MyProfileComponent,
    ModalItemComponent
  ],
  entryComponents: [ModalComponent, ModalRegisterComponent, ModalItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    DataTableModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
