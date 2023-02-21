import { TestBed } from '@angular/core/testing';

import { IteamService } from './iteam.service';

describe('IteamService', () => {
  let service: IteamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IteamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
