import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakeQuizPage } from './take-quiz.page';

describe('TakeQuizPage', () => {
  let component: TakeQuizPage;
  let fixture: ComponentFixture<TakeQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakeQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
