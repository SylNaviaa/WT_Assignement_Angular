import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { QuestionService } from '../_services/question.service';
import { AnswerService } from '../_services/answer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  question: any;
  newAnswerBody: string = ''; // Define newAnswerBody property
  myAnswers: any[] = [];
  editingAnswer: any = null;

  constructor(private authService: AuthService, private auth: AuthService, private questionService: QuestionService, private answerService: AnswerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.auth.canAccess();
    if (this.auth.isAuthenticated()) {
      const questionId = this.route.snapshot.paramMap.get('id');
      if (questionId) {
        this.questionService.getQuestionById(questionId).subscribe({
          next: (data: any) => {
            this.question = data;
            this.fetchUserNames();
            this.fetchMyAnswers(questionId);
            this.fetchNumberOfVotes(questionId); 
          },
          error: (error) => {
            console.error('Error fetching question detail:', error);
          }
        });
      }
    }
  }

  fetchUserNames(): void {
    // Fetch user name for question author
    this.authService.getUserNameFromId(this.question.userPosted).subscribe((user: any) => {
      this.question.userName = user.name;
    });

    // Fetch user names for answers
    this.question.answer.forEach((answer: any) => {
      this.authService.getUserNameFromId(answer.userId).subscribe((user: any) => {
        answer.userName = user.name;
      });
    });
  }

  fetchMyAnswers(questionId: string): void {
    // Call the AnswerService method to get user's answers
    this.answerService.getMyAnswers(questionId).subscribe({
      next: (data: any) => {
        this.myAnswers = data;
      },
      error: (error) => {
        console.error('Error fetching user answers:', error);
      }
    });
  }

  submitAnswer() {
    // Call the postAnswer method from AnswerService
    this.answerService.postAnswer(this.question._id, this.newAnswerBody).subscribe({
      next: (data: any) => {
        // Clear the newAnswerBody after posting
        this.newAnswerBody = '';
        // You may want to refresh the question detail view to reflect the new answer
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error posting answer:', error);
      }
    });
  }

  deleteAnswer(answerId: string) {
    const questionId = this.question._id;
    this.answerService.deleteAnswer(questionId, answerId).subscribe({
      next: () => {
        // You may want to refresh the question detail view to reflect the deleted answer
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error deleting answer:', error);
      }
    });
  }

  voteAnswer(answerId: string, value: string) {
    const questionId = this.question._id;
    this.answerService.voteAnswer(questionId, answerId, value).subscribe({
      next: (data: any) => {
        // You may want to refresh the question detail view to reflect the vote
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error voting for answer:', error);
      }
    });
  }

  // Edit an answer
  editAnswer(answer: any) {
    // Set the editingAnswer property to the answer being edited
    this.editingAnswer = answer;
    // Set the newAnswerBody to the current answer body for editing
    this.newAnswerBody = answer.answerBody;
  }

  // Save the edited answer
  saveEditedAnswer() {
    // Call the updateAnswer method from AnswerService
    this.answerService.modifyAnswer(this.question._id, this.editingAnswer._id, this.newAnswerBody).subscribe({
      next: (data: any) => {
        // Clear the newAnswerBody after updating
        this.newAnswerBody = '';
        // Reset the editingAnswer property
        this.editingAnswer = null;
        // You may want to refresh the question detail view to reflect the updated answer
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error updating answer:', error);
      }
    });
  }

    // Fetch number of votes for answers
    fetchNumberOfVotes(questionId: string): void {
      this.question.answer.forEach((answer: any) => {
        this.answerService.getNumberVoteAnswer(questionId, answer._id).subscribe({
          next: (data: any) => {
             // Update answer with vote count
            answer.numberOfUpVotes = data.noOfUpVote;
            answer.numberOfDownVotes = data.noOfDownVote;
            answer.voteCount = answer.numberOfUpVotes - answer.numberOfDownVotes;
          },
          error: (error) => {
            console.error('Error fetching vote count for answer:', error);
          }
        });
      });
    }
}
