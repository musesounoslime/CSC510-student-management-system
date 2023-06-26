import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpClientService {

  private readonly options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token') || ''
    }),

  };
  private baseUrl = 'http://localhost:4000';

  constructor(
    private httpClient: HttpClient,
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status !== 200) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return new Observable((observer) => {
      observer.complete();
    })
  }

  async login(data: any) {
    return this.post('/auth/login', data);
  }

  async signup(data: any) {
    return this.post('/auth/signup', data);
  }

  async addEvents(data: any) {
    return this.post('/account/events', data);
  }

  async fetchAcademicSession() {
    return this.get('/account/AcademicSession');
  }

  async fetchEvents(index = 0, searchValue = '') {
    return this.get(`/account/events?pageIndex=${index}&searchValue=${searchValue}`);
  }

  async deleteEvents(data: any) {
    return this.post('/account/delete/events', data);
  }

  async addCourse(data: any) {
    return this.post('/account/addCourse', data);
  }

  async deleteCourse(data: any) {
    return this.post('/account/deleteCourse', data);
  }

  async fetchCourseIds() {
    return this.get('/account/courseIds');
  }

  async fetchCourseList(AcademicSessionValue: any, courseValue: any, pageIndex: any) {
    return this.get(`/account/courseList?academicSession=${AcademicSessionValue}&course=${courseValue}&pageIndex=${pageIndex}`);
  }

  async fetchAllCourseList() {
    return this.get('/account/allCourseList');
  }

  async fetchAcademicSessionList(pageIndex: any) {
    return this.get(`/account/academicSessionList?pageIndex=${pageIndex}`);
  }

  async deleteAcademicSession(data: any) {
    return this.post('/account/delete/academicSession', data);
  }

  async addAcademicSession(data: any) {
    return this.post('/account/add/academicSession', data);
  }

  async fetchAllWeek() {
    return this.get('/account/allWeek');
  }

  get(url: string) {
    return this.httpClient.get(this.baseUrl + url, this.options).pipe(catchError(this.handleError));
  }
  delete(url: string) {
    return this.httpClient.delete(this.baseUrl + url, this.options).pipe(catchError(this.handleError));
  }

  put(url: string, data: any) {
    return this.httpClient.put(this.baseUrl + url, data, this.options).pipe(catchError(this.handleError));
  }

  post(url: string, data: any) {
    return this.httpClient.post(this.baseUrl + url, data, this.options).pipe(catchError(this.handleError));
  }

}