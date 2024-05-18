import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

import { AppComponent } from './app.component';
import { QuestionListComponent } from './question-list/question-list.component'; // Import QuestionListComponent

@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent // Add QuestionListComponent to declarations
  ],
  imports: [
    BrowserModule,
    CommonModule // Add CommonModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
