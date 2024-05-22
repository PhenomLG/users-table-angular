import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClientsPopupComponent } from './delete-clients-popup.component';

describe('DeleteClientsPopupComponent', () => {
  let component: DeleteClientsPopupComponent;
  let fixture: ComponentFixture<DeleteClientsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteClientsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteClientsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
