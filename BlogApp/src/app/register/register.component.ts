import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formdata = { name: "", email: "", password: "" };
  submit = false;
  errorMessage = "";
  loading = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    this.loading = true;

    // Call register service
    this.auth.register(this.formdata.name, this.formdata.email, this.formdata.password).subscribe({
      next: data => {
        // Store token from response data
        this.auth.storeToken(data.token);
        this.auth.canAuthenticate();
      },
      error: data => {
        if (data.error.message === "User already exist") {
          this.errorMessage = "Already Email Exists!";
        } else {
          this.errorMessage = "Unknown error occurred when creating this account!";
        }
      }
    }).add(() => {
      this.loading = false;
    });
  }
}
