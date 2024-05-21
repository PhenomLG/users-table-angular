import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { CheckboxComponent } from "../../checkbox/checkbox.component";
import { TClientTableRow } from "../../../app/pages/clients/clients.types";

@Component({
    selector: 'initium-table-row',
    standalone: true,
    imports: [
        CheckboxComponent
    ],
    templateUrl: './table-row.component.html',
    styleUrl: './table-row.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent {
    client: InputSignal<TClientTableRow> = input.required<TClientTableRow>();
}
