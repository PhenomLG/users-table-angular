import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientPopupComponent } from './new-client-popup.component';

describe('NewClientPopupComponent', () => {
  let component: NewClientPopupComponent;
  let fixture: ComponentFixture<NewClientPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewClientPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewClientPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
