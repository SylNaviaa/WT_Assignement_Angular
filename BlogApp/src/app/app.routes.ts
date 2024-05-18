import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
// import { QuestionDetailsComponent } from './question-details/question-details.component';
// import { AskQuestionComponent } from './ask-question/ask-question.component';
// import { RegistrationComponent } from './registration/registration.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'questions', component: QuestionListComponent },
  // { path: 'questions/:id', component: QuestionDetailsComponent },
  // { path: 'ask', component: AskQuestionComponent },
  // { path: 'register', component: RegistrationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/questions', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
