import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  isAdmin = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authenticationService.isAdminIn().subscribe(value => this.isAdmin = value);
    if (this.isAdmin) {
      return true;
    }

    this.router.navigate(['/home'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
