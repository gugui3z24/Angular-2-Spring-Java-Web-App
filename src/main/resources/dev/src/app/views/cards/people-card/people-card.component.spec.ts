import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleCardComponent } from './people-card.component';

describe('PeopleCardComponent', () => {
  let component: PeopleCardComponent;
  let fixture: ComponentFixture<PeopleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
