import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionsCardComponent } from './opinions-card.component';

describe('OpinionsCardComponent', () => {
  let component: OpinionsCardComponent;
  let fixture: ComponentFixture<OpinionsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinionsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
