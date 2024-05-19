import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuestionListComponent } from './my-question-list.component';

describe('MyQuestionListComponent', () => {
  let component: MyQuestionListComponent;
  let fixture: ComponentFixture<MyQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyQuestionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
