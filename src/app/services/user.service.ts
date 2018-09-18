import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = 'https://university-management-app-back.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<any[]>(`${this.API_URL}/users`).pipe(map(data => data));
  }

  register(user: User) {
    return this.http.post(`${this.API_URL}/api/auth/signup`, user);
  }

  registerTeacher(user: User) {
    return this.http.post(`${this.API_URL}/api/auth/signupTeacher`, user);
  }

  getUser(username: string) {
    return this.http.get(`${this.API_URL}/user/` + username);
  }

  getStudentItems(username: string) {
    return this.http.get(`${this.API_URL}/student/` + username + `/items`);
  }

  getTeacherItems(username: string) {
    return this.http.get(`${this.API_URL}/teacher/` + username + `/items`);
  }

  update(user: User) {
    return this.http.put(`/users/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/user/` + id);
  }
}

