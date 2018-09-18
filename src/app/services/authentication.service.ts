import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserPrincipal } from '../models/userPrincipal';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_URL = 'https://university-management-app-back.herokuapp.com';

  user: UserPrincipal = new UserPrincipal();

  private isLogged = new BehaviorSubject<boolean>(false);
  private isAdmin = new BehaviorSubject<boolean>(false);
  private isTeacher = new BehaviorSubject<boolean>(false);
  private isStudent = new BehaviorSubject<boolean>(false);

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

  isAdminIn() {
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.user.roles.forEach(role => {
        if (role.id === 1) {
          this.isAdmin.next(true);
        }
        if (role.id === 2) {
          this.isTeacher.next(true);
        }
        if (role.id === 3) {
          this.isStudent.next(true);
        }
      });
    }
    return this.isAdmin.asObservable();
  }

  isTeacherIn() {
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.user.roles.forEach(role => {
        if (role.id === 1) {
          this.isAdmin.next(true);
        }
        if (role.id === 2) {
          this.isTeacher.next(true);
        }
        if (role.id === 3) {
          this.isStudent.next(true);
        }
      });
    }
    return this.isTeacher.asObservable();
  }

  isStudentIn() {
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.user.roles.forEach(role => {
        if (role.id === 1) {
          this.isAdmin.next(true);
        }
        if (role.id === 2) {
          this.isTeacher.next(true);
        }
        if (role.id === 3) {
          this.isStudent.next(true);
        }
      });
    }
    return this.isStudent.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post(`${this.API_URL}/api/auth/signin`, {usernameOrEmail: username, password: password}).pipe(map(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.user.roles.forEach(role => {
          if (role.id === 1) {
            this.isAdmin.next(true);
          }
          if (role.id === 2) {
            this.isTeacher.next(true);
          }
          if (role.id === 3) {
            this.isStudent.next(true);
          }
        });
        this.isLogged.next(true);
      }
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLogged.next(false);
    this.isAdmin.next(false);
    this.isTeacher.next(false);
    this.isStudent.next(false);
  }

  getUsername() {
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      return this.user.username;
    }
  }
}
