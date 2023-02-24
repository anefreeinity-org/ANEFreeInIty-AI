import { TestBed } from '@angular/core/testing';

import { ProjectIteamService } from './project-iteam.service';

describe('ProjectIteamService', () => {
  let service: ProjectIteamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectIteamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
