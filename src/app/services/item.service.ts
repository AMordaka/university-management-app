import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { CourseInfo } from '../models/courseInfo';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  API_URL = 'http://localhost:5000';

  //API_URL = 'https://university-management-app-back.herokuapp.com';

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

  sendResultsInPdf(courseName: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.API_URL}/file/addPdf/` + courseName, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
