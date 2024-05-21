import { TestBed } from '@angular/core/testing';

import { NewClientFormService } from './new-client-form.service';

describe('NewClientFormService', () => {
  let service: NewClientFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewClientFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
