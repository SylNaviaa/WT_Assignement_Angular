import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private baseUrl: string = 'http://localhost:5000/answer';

  constructor(private router: Router, private http: HttpClient) { }

  postAnswer(questionId: string, answerBody: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.patch<any>(`${this.baseUrl}/post/${questionId}`, { answerBody }, { headers });
  }

  deleteAnswer(questionId: string, answerId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.patch<any>(`${this.baseUrl}/delete/${questionId}`, { answerId }, { headers });
  }

  voteAnswer(questionId: string, answerId: string, value: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.patch<any>(`${this.baseUrl}/vote/${questionId}`, { answerId, value }, { headers });
  }

  getMyAnswers(questionId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get<any>(`${this.baseUrl}/getMyAnswers/${questionId}`, { headers });
  }

  modifyAnswer(questionId: string, answerId: string, newAnswerBody: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.patch<any>(`${this.baseUrl}/modify/${questionId}`, { answerId, answerBody: newAnswerBody }, { headers });
  }

}