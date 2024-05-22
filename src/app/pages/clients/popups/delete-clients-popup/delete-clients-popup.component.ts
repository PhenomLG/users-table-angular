import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Modal } from "../../../../../ui/modal/modal.component";
import { TClientTableRow } from "../../clients.types";
import { DefaultOverlayComponent } from "../../../../../ui/default-overlay/default-overlay.component";
import { ButtonComponent } from "../../../../../ui/button/button.component";
import { ClientsService } from "../../clients.service";

@Component({
  selector: 'initium-delete-clients-popup',
  standalone: true,
    imports: [
        DefaultOverlayComponent,
        ButtonComponent
    ],
  templateUrl: './delete-clients-popup.component.html',
  styleUrls: ['./delete-clients-popup.component.scss', '../../../../..//ui/modal/modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteClientsPopupComponent extends Modal {
    @Input() clients: TClientTableRow[] = [];
    #clientsService: ClientsService = inject(ClientsService);

    onDeleteClick(): void {
        this.#clientsService.deleteClients(this.clients);
        this.onCloseModalClick();
    }
}
