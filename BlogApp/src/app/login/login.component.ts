import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  token: string | undefined;

  constructor(private http: HttpClient) {}

  loginUser(): void {
    const userData = {
      user: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:5000/user/login', userData)
      .subscribe(
        (response) => {
          console.log('Login successful', response);
          this.token = response.token; // Assuming the token is returned in the response
          // Optionally, navigate to another page after successful login
        },
        (error) => {
          console.error('Login failed', error);
          // Handle error, display error message, etc.
        }
      );
  }
}
