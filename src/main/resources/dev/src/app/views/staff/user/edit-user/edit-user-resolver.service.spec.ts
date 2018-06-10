import { TestBed, inject } from '@angular/core/testing';

import { EditUserResolverService } from './edit-user-resolver.service';

describe('EditUserResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditUserResolverService]
    });
  });

  it('should be created', inject([EditUserResolverService], (service: EditUserResolverService) => {
    expect(service).toBeTruthy();
  }));
});
