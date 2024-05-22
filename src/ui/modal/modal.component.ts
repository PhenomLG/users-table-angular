import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  template: '',
})
export abstract class Modal{
    @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
    onCloseModalClick(): void {
        this.closeModal.emit();
    }
}
