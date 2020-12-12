import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSigninCardComponent } from './admin-signin-card.component';

describe('AdminSigninCardComponent', () => {
  let component: AdminSigninCardComponent;
  let fixture: ComponentFixture<AdminSigninCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSigninCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSigninCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
