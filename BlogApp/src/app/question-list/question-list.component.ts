import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { QuestionService } from '../_services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: any[] = [];
  searchQuery: string = '';

  constructor(private auth: AuthService, private questionService: QuestionService, private router: Router) { }

  ngOnInit(): void {
    this.auth.canAccess();
    if (this.auth.isAuthenticated()) {
      this.loadAllQuestions();
    }
  }

  loadAllQuestions() {
    this.questionService.getAllQuestions().subscribe({
      next: (data: any[]) => {
        this.questions = data;
      },
      error: (error) => {
        console.error('Error fetching questions:', error);
      }
    });
  }

  searchQuestions() {
    if (this.searchQuery.trim() === '') {
      this.loadAllQuestions(); // Reload all questions if search query is empty
    } else {
      this.questionService.getQuestionsByTitle(this.searchQuery).subscribe({
        next: (data: any[]) => {
          this.questions = data;
        },
        error: (error) => {
          console.error('Error searching questions:', error);
        }
      });
    }
  }

  viewQuestionDetail(questionId: string) {
    this.router.navigate(['/question-detail', questionId]);
  }
}
