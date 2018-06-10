import { TestBed, inject } from '@angular/core/testing';

import { EditArticleResolverService } from './edit-article-resolver.service';

describe('EditArticleResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditArticleResolverService]
    });
  });

  it('should be created', inject([EditArticleResolverService], (service: EditArticleResolverService) => {
    expect(service).toBeTruthy();
  }));
});
