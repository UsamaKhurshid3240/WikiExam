import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentPage } from './student.page';

describe('StudentPage', () => {
  let component: StudentPage;
  let fixture: ComponentFixture<StudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
