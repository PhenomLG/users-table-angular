import { Component, input, InputSignal } from '@angular/core';
import { PlusIconComponent } from "../../svg/plus/plus-icon.component";
import { TrashIconComponent } from "../../svg/trash/trash-icon.component";
import { TClient } from "../../app/pages/clients/clients.types";
import { CheckboxComponent } from "../checkbox/checkbox.component";

@Component({
    selector: 'initium-table',
    standalone: true,
    imports: [
        PlusIconComponent,
        TrashIconComponent,
        CheckboxComponent
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent {
    clients: InputSignal<TClient[]> = input.required<TClient[]>();
}
