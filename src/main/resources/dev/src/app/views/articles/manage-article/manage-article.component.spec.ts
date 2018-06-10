import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArticleComponent } from './manage-article.component';

describe('ManageArticleComponent', () => {
  let component: ManageArticleComponent;
  let fixture: ComponentFixture<ManageArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
