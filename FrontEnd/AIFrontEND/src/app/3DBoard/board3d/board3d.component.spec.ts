import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board3dComponent } from './board3d.component';

describe('Board3dComponent', () => {
  let component: Board3dComponent;
  let fixture: ComponentFixture<Board3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Board3dComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Board3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
