// question.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:5000/questions';

  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get`);
  }

  getQuestionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/${id}`);
  }

  getQuestionsByTitle(title: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getQuestionsByTitle/${title}`);
  }

  getMyQuestions(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Assuming you have a method getToken() in AuthService to retrieve the token
    });
    return this.http.get<any[]>(`${this.baseUrl}/getMyQuestions`, { headers });
  }

  deleteQuestion(questionId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.delete<any>(`${this.baseUrl}/delete/${questionId}`, { headers });
  }
  
  askQuestion(questionData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.post<any>(`${this.baseUrl}/ask`, questionData, { headers });
  }  
}
