import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { QuestionService } from '../_services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-question-list',
  templateUrl: './my-question-list.component.html',
  styleUrls: ['./my-question-list.component.css']
})
export class MyQuestionListComponent implements OnInit {

  questions: any[] = [];
  searchQuery: string = '';

  constructor(private auth: AuthService, private questionService: QuestionService, private router: Router) { }

  ngOnInit(): void {
    this.auth.canAccess();
    if (this.auth.isAuthenticated()) {
      this.loadMyQuestions();
    }
  }

  loadMyQuestions() {
    this.questionService.getMyQuestions().subscribe({
      next: (data: any[]) => {
        this.questions = data;
      },
      error: (error) => {
        console.error('Error fetching my questions:', error);
      }
    });
  }

  viewQuestionDetail(questionId: string) {
    this.router.navigate(['/question-detail', questionId]);
  }

  deleteQuestion(questionId: string) {
    if (confirm("Are you sure you want to delete this question?")) {
      this.questionService.deleteQuestion(questionId).subscribe({
        next: () => {
          // Remove the deleted question from the list
          this.questions = this.questions.filter(question => question._id !== questionId);
        },
        error: (error) => {
          console.error('Error deleting question:', error);
        }
      });
    }
  }

  createQuestion() {
    this.router.navigate(['/create-question']);
  }
}
