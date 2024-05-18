import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  name: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  registerUser(): void {
    const userData = {
      email: this.email,
      name: this.name,
      password: this.password
    };

    this.http.post('http://localhost:5000/user/signup', userData)
      .subscribe(
        (response) => {
          console.log('Registration successful', response);
          // Optionally, navigate to another page after successful registration
        },
        (error) => {
          console.error('Registration failed', error);
          // Handle error, display error message, etc.
        }
      );
  }
}
