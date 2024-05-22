import { ChangeDetectionStrategy, Component, EventEmitter, inject, input, InputSignal, Output } from '@angular/core';
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
    @Output() rowNameClick: EventEmitter<TClientTableRow> = new EventEmitter<TClientTableRow>();
    client: InputSignal<TClientTableRow> = input.required<TClientTableRow>();
    #tableDataService: TableDataService = inject(TableDataService);

    onCheckboxClick(isChecked: boolean): void {
        this.#tableDataService.setCheckboxClickSubjectObservable(this.client().id, isChecked);
    }

    onRowNameClick(): void {
        this.rowNameClick.emit(this.client());
    }
}
