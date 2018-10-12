import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isAdminIn$: Observable<boolean>;
  isTeacherIn$: Observable<boolean>;
  isStudentIn$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService, private alertService: AlertService, private router: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('pl');
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authenticationService.isLoggedIn();
    this.isAdminIn$ = this.authenticationService.isAdminIn();
    this.isTeacherIn$ = this.authenticationService.isTeacherIn();
    this.isStudentIn$ = this.authenticationService.isStudentIn();
  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
    this.alertService.success('Logout Successfully');
  }

  changeLanguageToPolish() {
    this.translate.use('pl');
  }

  changeLanguageToEnglish() {
    this.translate.use('en');
  }
}
