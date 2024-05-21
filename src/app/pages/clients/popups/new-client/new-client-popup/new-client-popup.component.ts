import { Component, EventEmitter, Output } from '@angular/core';
import { DefaultOverlayComponent } from "../../../../../../ui/default-overlay/default-overlay.component";
import { ButtonComponent } from "../../../../../../ui/button/button.component";

@Component({
  selector: 'initium-new-client-popup',
  standalone: true,
    imports: [
        DefaultOverlayComponent,
        ButtonComponent
    ],
  templateUrl: './new-client-popup.component.html',
  styleUrl: './new-client-popup.component.scss'
})
export class NewClientPopupComponent {
    @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

    onCloseModalClick(): void {
        this.closeModal.emit();
    }
}
