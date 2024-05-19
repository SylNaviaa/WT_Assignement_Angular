import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../_services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  questionTitle: string = '';
  questionBody: string = '';

  constructor(private questionService: QuestionService, private router: Router) { }

  ngOnInit(): void {
  }

  submitQuestion() {
    if (this.questionTitle.trim() === '' || this.questionBody.trim() === '') {
      // You can add validation here if needed
      alert('Please enter both question title and body.');
      return;
    }

    const questionData = {
      questionTitle: this.questionTitle,
      questionBody: this.questionBody
    };

    this.questionService.askQuestion(questionData).subscribe({
      next: () => {
        // Redirect to the My Questions page after successful submission
        this.router.navigate(['/my-question-list']);
      },
      error: (error) => {
        console.error('Error submitting question:', error);
        alert('Failed to submit question. Please try again later.');
      }
    });
  }
}
