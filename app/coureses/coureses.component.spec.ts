import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouresesComponent } from './coureses.component';

describe('CouresesComponent', () => {
  let component: CouresesComponent;
  let fixture: ComponentFixture<CouresesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouresesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouresesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
