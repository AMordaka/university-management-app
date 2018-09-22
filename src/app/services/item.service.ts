import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseInfo } from '../models/courseInfo';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  API_URL = 'https://university-management-app-back.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  putGrade(courseInfo: CourseInfo, courseId: string) {
    return this.http.post(`${this.API_URL}/${courseId}/putGrade`, courseInfo);
  }

  createCourse(teacherUsername: string, courseName: string) {
    return this.http.post(`${this.API_URL}/teacher/${teacherUsername}`, courseName);
  }

  getItems(teacherUsername: string, courseName: string) {
    return this.http.get(`${this.API_URL}/items/${teacherUsername}/${courseName}`);
  }

  assignStudentsToCourse(courseName: string, assigned: Array<string>) {
    return this.http.post(`${this.API_URL}/addStudents/${courseName}`, assigned);
  }
}
