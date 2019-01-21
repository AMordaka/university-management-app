import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = 'http://localhost:5000';

  //API_URL = 'https://university-management-app-back.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<any[]>(`${this.API_URL}/users`).pipe(map(data => data));
  }

  getStudents(courseName: string) {
    return this.http.get<any[]>(`${this.API_URL}/students/${courseName}`).pipe(map(data => data));
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

  getStudentItemsGrades(username: string) {
    return this.http.get<number[]>(`${this.API_URL}/student/` + username + `/itemsgrade`);
  }

  getTeacherItemsGrades(username: string) {
    return this.http.get(`${this.API_URL}/teacher/` + username + `/itemsgrade`);
  }

  getTeacherItems(username: string) {
    return this.http.get(`${this.API_URL}/teacher/` + username + `/items`);
  }

  update(user: User) {
    return this.http.post(`${this.API_URL}/updateUser`, user);
  }

  updateUserByAdmin(user: User) {
    return this.http.post(`${this.API_URL}/updateUserByAdmin`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.API_URL}/user/` + id.toString());
  }

  addAvatar(file: File) {

    const formData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.API_URL}/file/addavatar`, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getAvatar(): Observable<any> {
    return this.http.get(`${this.API_URL}/file/getavatar`, {responseType: 'blob'});
  }
}

