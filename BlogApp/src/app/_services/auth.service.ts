import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:5000/user';

  constructor(private router:Router,private http:HttpClient) { }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  canAccess(){
    if (!this.isAuthenticated()) {
        this.router.navigate(['/login']);
    }
  }
  canAuthenticate(){
    if (this.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  register(name: string, email: string, password: string) {
    return this.http.post<{ result: any, token: string }>(
      `${this.baseUrl}/signup`,
      { name, email, password }
    );
  }

  storeToken(token:string){
      sessionStorage.setItem('token',token);
  }

  login(email: string, password: string) {
    return this.http.post<{ result: any, token: string }>(
      `${this.baseUrl}/login`,
      { email, password }
    );
  }

  getUser() {
    const token = sessionStorage.getItem('token');
    return this.http.get<{ _id: string, name: string, email: string, about?: string, tags?: string[] }>(
      `${this.baseUrl}/getUser`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  updateProfile(name: string) {
    const token = sessionStorage.getItem('token');
    return this.http.patch<{ _id: string, name: string, email: string, about?: string, tags?: string[] }>(
      `${this.baseUrl}/update/${this.getUserIdFromToken(token)}`,
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  getUserIdFromToken(token: string | null): string | null {
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  }

  getUserNameFromId(id: string) {
    return this.http.get<{ name: string }>(`${this.baseUrl}/getUserByUserId/${id}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllUsers`);
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }
}
