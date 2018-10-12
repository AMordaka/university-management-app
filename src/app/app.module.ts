import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { ModalGradeComponent } from './modal-grade/modal-grade.component';
import { ItemProfileComponent } from './item-profile/item-profile.component';
import { ModalPickerComponent } from './modal-picker/modal-picker.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared.module';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

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
    ModalItemComponent,
    ModalGradeComponent,
    ItemProfileComponent,
    ModalPickerComponent
  ],
  entryComponents: [ModalComponent, ModalRegisterComponent, ModalItemComponent, ModalGradeComponent, ModalPickerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    DataTableModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
