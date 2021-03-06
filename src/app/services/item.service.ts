import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { CourseInfo } from '../models/courseInfo';
import { map } from 'rxjs/operators';

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

  getAllPdfs() {
    return this.http.get<any[]>(`${this.API_URL}/file/all`).pipe(map(data => data));
  }

  getPdf(id: string) {
    const headers = new HttpHeaders().set('content-type', 'multipart/form-data');
    return this.http.get(`${this.API_URL}/file/pdf/` + id, {headers: headers, responseType: 'blob'});
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.API_URL}/file/pdf/` + id);
  }żą
}
