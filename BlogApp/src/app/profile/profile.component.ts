import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = { _id: '', name: '', email: '', about: '' as string | undefined, tags: [] as string[] | undefined };
  users: any[] = [];
  loading = false;
  errorMessage = "";
  successMessage = "";

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.canAccess();
    if (this.auth.isAuthenticated()) {
      this.loading = true;
      this.auth.getUser().subscribe({
        next: data => {
          this.user = {
            _id: data._id,
            name: data.name,
            email: data.email,
            about: data.about || '', // Default to empty string if undefined
            tags: data.tags || [] // Default to empty array if undefined
          };
        },
        error: err => {
          this.errorMessage = err.error.message || "Failed to fetch user details.";
        }
      }).add(() => {
        this.loading = false;
      });
    }
    this.auth.getAllUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  updateProfile() {
    if (this.auth.isAuthenticated()) {
      this.loading = true;
      this.auth.updateProfile(this.user.name).subscribe({
        next: data => {
          this.user = {
            ...this.user,
            name: data.name
          };
          this.successMessage = "Profile updated successfully!";
        },
        error: err => {
          this.errorMessage = err.error.message || "Failed to update profile.";
        }
      }).add(() => {
        this.loading = false;
      });
    }
  }
}
