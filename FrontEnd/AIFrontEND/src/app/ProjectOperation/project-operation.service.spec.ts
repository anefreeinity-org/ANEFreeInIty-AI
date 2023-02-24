import { TestBed } from '@angular/core/testing';

import { ProjectOperationService } from './project-operation.service';

describe('ProjectOperationService', () => {
  let service: ProjectOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
