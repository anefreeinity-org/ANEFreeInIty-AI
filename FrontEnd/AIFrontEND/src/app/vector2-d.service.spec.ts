import { TestBed } from '@angular/core/testing';

import { Vector2DService } from './vector2-d.service';

describe('Vector2DService', () => {
  let service: Vector2DService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vector2DService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
