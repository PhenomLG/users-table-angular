import { TestBed } from '@angular/core/testing';

import { NewClientPopupService } from './new-client-popup.service';

describe('NewClientPopupService', () => {
  let service: NewClientPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewClientPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
