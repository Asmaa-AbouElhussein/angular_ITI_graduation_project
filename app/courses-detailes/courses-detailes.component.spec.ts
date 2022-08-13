import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDetailesComponent } from './courses-detailes.component';

describe('CoursesDetailesComponent', () => {
  let component: CoursesDetailesComponent;
  let fixture: ComponentFixture<CoursesDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesDetailesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
