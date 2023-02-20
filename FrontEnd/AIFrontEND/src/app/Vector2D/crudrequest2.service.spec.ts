import { TestBed } from '@angular/core/testing';

import { CRUDRequest2Service } from './crudrequest2.service';

describe('CRUDRequest2Service', () => {
  let service: CRUDRequest2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRUDRequest2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
