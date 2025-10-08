import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousUpdates } from './previous-updates';

describe('PreviousUpdates', () => {
  let component: PreviousUpdates;
  let fixture: ComponentFixture<PreviousUpdates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousUpdates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousUpdates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
