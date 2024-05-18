import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

interface Question {
  _id: number;
  questionTitle: string;
  questionBody: string;
}

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Question[]>('http://localhost:5000/questions/get').subscribe(
      (data) => {
        this.questions = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching questions', error);
      }
    );
  }
}
