import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentsListPage } from './students-list.page';

describe('StudentsListPage', () => {
  let component: StudentsListPage;
  let fixture: ComponentFixture<StudentsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
