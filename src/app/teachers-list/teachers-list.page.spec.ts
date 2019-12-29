import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeachersListPage } from './teachers-list.page';

describe('TeachersListPage', () => {
  let component: TeachersListPage;
  let fixture: ComponentFixture<TeachersListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeachersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
