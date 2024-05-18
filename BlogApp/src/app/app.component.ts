import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule],  // Remove QuestionListComponent from imports
  standalone: true
})
export class AppComponent {
  title = 'DIY Advice';
}
