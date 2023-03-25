import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IteamOperationComponent } from './iteam-operation.component';

describe('IteamOperationComponent', () => {
  let component: IteamOperationComponent;
  let fixture: ComponentFixture<IteamOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IteamOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IteamOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
