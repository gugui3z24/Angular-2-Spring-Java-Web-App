import { TestBed, inject } from '@angular/core/testing';

import { ManageArticleResolverService } from './manage-article-resolver.service';

describe('ManageArticleResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageArticleResolverService]
    });
  });

  it('should be created', inject([ManageArticleResolverService], (service: ManageArticleResolverService) => {
    expect(service).toBeTruthy();
  }));
});
