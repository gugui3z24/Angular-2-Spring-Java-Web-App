import { TestBed, inject } from '@angular/core/testing';

import { ManagerUserResolverService } from './manager-user-resolver.service';

describe('ManagerUserResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerUserResolverService]
    });
  });

  it('should be created', inject([ManagerUserResolverService], (service: ManagerUserResolverService) => {
    expect(service).toBeTruthy();
  }));
});
