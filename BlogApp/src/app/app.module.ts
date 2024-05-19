import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { MyQuestionListComponent } from './my-question-list/my-question-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CreateQuestionComponent } from './create-question/create-question.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes:Routes = [
  {path:'',component:HomeComponent },
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'my-question-list',component:MyQuestionListComponent},
  {path:'question-list',component:QuestionListComponent},
  { path: 'question-detail/:id', component: QuestionDetailComponent },
  {path:'create-question',component:CreateQuestionComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    QuestionListComponent,
    QuestionDetailComponent,
    MyQuestionListComponent,
    CreateQuestionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
