import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditPopupComponent } from './client-edit-popup.component';

describe('NewClientPopupComponent', () => {
  let component: ClientEditPopupComponent;
  let fixture: ComponentFixture<ClientEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientEditPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
