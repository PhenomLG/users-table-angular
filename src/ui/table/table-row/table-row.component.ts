import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { CheckboxComponent } from "../../checkbox/checkbox.component";
import { TClientTableRow } from "../../../app/pages/clients/clients.types";
import { TableDataService } from "../table-data.service";

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
    #tableDataService: TableDataService = inject(TableDataService);

    onCheckboxClick(isChecked: boolean): void {
        this.#tableDataService.setCheckboxClickSubjectObservable(this.client().id, isChecked);
    }
}
