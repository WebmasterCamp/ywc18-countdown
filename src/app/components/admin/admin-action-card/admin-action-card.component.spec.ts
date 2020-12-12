import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionCardComponent } from './admin-action-card.component';

describe('AdminActionCardComponent', () => {
  let component: AdminActionCardComponent;
  let fixture: ComponentFixture<AdminActionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
