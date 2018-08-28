import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  API_URL  =  'http://university-management-app-back.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post(`${this.API_URL}/api/auth/signin`, {usernameOrEmail: username, password: password});
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
