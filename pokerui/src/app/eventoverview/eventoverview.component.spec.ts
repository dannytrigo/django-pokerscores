import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoverviewComponent } from './eventoverview.component';

describe('EventoverviewComponent', () => {
  let component: EventoverviewComponent;
  let fixture: ComponentFixture<EventoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
