import { TestBed } from '@angular/core/testing';

import { DeleteClientsPopupService } from './delete-clients-popup.service';

describe('DeleteClientsPopupService', () => {
  let service: DeleteClientsPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteClientsPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
