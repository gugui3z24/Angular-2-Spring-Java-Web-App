import { TestBed, inject } from '@angular/core/testing';

import { ArticlesResolverService } from './articles-resolver.service';

describe('ArticlesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticlesResolverService]
    });
  });

  it('should be created', inject([ArticlesResolverService], (service: ArticlesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
