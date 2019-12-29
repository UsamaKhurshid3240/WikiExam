import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateExamPage } from './create-exam.page';

describe('CreateExamPage', () => {
  let component: CreateExamPage;
  let fixture: ComponentFixture<CreateExamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
