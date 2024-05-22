import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { DefaultOverlayComponent } from "../../../../../ui/default-overlay/default-overlay.component";
import { ButtonComponent } from "../../../../../ui/button/button.component";
import { InputComponent } from "../../../../../ui/input/input.component";
import { ClientFormService } from "../services/client-form.service";
import { ReactiveFormsModule } from "@angular/forms";
import { Modal } from "../../../../../ui/modal/modal.component";
import { FormInputComponent } from "./form-input/form-input.component";
import { TClientTableRow } from "../../clients.types";

@Component({
    selector: 'initium-client-edit-popup',
    standalone: true,
    imports: [
        DefaultOverlayComponent,
        ButtonComponent,
        InputComponent,
        ReactiveFormsModule,
        InputComponent,
        FormInputComponent
    ],
    templateUrl: './client-edit-popup.component.html',
    styleUrls: ['../../../../..//ui/modal/modal.component.scss', './client-edit-popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientEditPopupComponent extends Modal implements OnInit {
    @Input() client: TClientTableRow | undefined;
    protected clientFormService: ClientFormService = inject(ClientFormService);

    ngOnInit(): void {
        this.clientFormService.setForm(this.client);
    }

    onSaveClick(): void {
        this.clientFormService.saveClient();
        this.onCloseModalClick();
    }
}
