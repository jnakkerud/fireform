import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireformLibComponent } from './fireform-lib.component';

describe('FireformLibComponent', () => {
  let component: FireformLibComponent;
  let fixture: ComponentFixture<FireformLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireformLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FireformLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
