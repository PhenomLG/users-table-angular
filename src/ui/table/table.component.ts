import { ChangeDetectionStrategy, Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { PlusIconComponent } from "../../svg/plus/plus-icon.component";
import { TrashIconComponent } from "../../svg/trash/trash-icon.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { TableRowComponent } from "./table-row/table-row.component";
import { TClientTableRow } from "../../app/pages/clients/clients.types";
import { TableDataService } from "./table-data.service";

@Component({
    selector: 'initium-table',
    standalone: true,
    imports: [
        PlusIconComponent,
        TrashIconComponent,
        CheckboxComponent,
        TableRowComponent
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
    clients: InputSignal<TClientTableRow[]> = input.required<TClientTableRow[]>();
    allRowsChecked: Signal<boolean> = computed(() => {
        return this.clients().every((client: TClientTableRow) => client.isChecked);
    });

    #tableDataService: TableDataService = inject(TableDataService);

    onChooseAllCheckboxClick(isChecked: boolean): void {
        this.#tableDataService.setAllCheckboxClickSubjectObservable(isChecked);
    }
}
