import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLeague } from './manager-league';

describe('ManagerLeague', () => {
  let component: ManagerLeague;
  let fixture: ComponentFixture<ManagerLeague>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerLeague]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerLeague);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
