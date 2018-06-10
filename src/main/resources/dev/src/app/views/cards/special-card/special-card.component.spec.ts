import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialCardComponent } from './special-card.component';

describe('SpecialCardComponent', () => {
  let component: SpecialCardComponent;
  let fixture: ComponentFixture<SpecialCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
