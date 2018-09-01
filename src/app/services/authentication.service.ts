import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  API_URL = 'https://university-management-app-back.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post(`${this.API_URL}/api/auth/signin`, {usernameOrEmail: username, password: password}).pipe(map(user => {
      if (user) {
        this.loggedIn.next(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    }));
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
  }
}
