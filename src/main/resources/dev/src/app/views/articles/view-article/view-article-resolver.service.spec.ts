import { TestBed, inject } from '@angular/core/testing';

import { ViewArticleResolverService } from './view-article-resolver.service';

describe('ViewArticleResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewArticleResolverService]
    });
  });

  it('should be created', inject([ViewArticleResolverService], (service: ViewArticleResolverService) => {
    expect(service).toBeTruthy();
  }));
});
