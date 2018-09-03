import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { of } from "rxjs";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_URL = 'https://university-management-app-back.herokuapp.com';

  private isLogged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      this.isLogged.next(true);
      return this.isLogged.asObservable(); 
    }
     this.isLogged.next(false);
     return this.isLogged.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post(`${this.API_URL}/api/auth/signin`, {usernameOrEmail: username, password: password}).pipe(map(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.isLogged.next(true);
      }
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLogged.next(false);
  }
}
