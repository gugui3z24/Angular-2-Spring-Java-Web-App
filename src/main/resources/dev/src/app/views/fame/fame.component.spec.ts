import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FameComponent } from './fame.component';

describe('FameComponent', () => {
  let component: FameComponent;
  let fixture: ComponentFixture<FameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
