import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetachablesComponent } from './detachables.component';

describe('DetachablesComponent', () => {
  let component: DetachablesComponent;
  let fixture: ComponentFixture<DetachablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetachablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetachablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
