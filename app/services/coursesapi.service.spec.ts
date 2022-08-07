import { TestBed } from '@angular/core/testing';

import { CoursesapiService } from './coursesapi.service';

describe('CoursesapiService', () => {
  let service: CoursesapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
