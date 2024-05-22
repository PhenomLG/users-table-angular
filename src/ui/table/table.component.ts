import { ChangeDetectionStrategy, Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { PlusIconComponent } from "../../svg/plus/plus-icon.component";
import { TrashIconComponent } from "../../svg/trash/trash-icon.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { TableRowComponent } from "./table-row/table-row.component";
import { TClientTableRow } from "../../app/pages/clients/clients.types";
import { TableDataService } from "./table-data.service";
import {
    ClientPopupService
} from "../../app/pages/clients/popups/new-client-popup/client-popup.service";
import {
    DeleteClientsPopupService
} from "../../app/pages/clients/popups/delete-clients-popup/delete-clients-popup.service";

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
    someRowsChecked: Signal<boolean> = computed(() => {
        return this.clients().some((client: TClientTableRow) => client.isChecked) && !this.allRowsChecked();
    })

    #tableDataService: TableDataService = inject(TableDataService);
    #clientPopupService: ClientPopupService = inject(ClientPopupService);
    #deleteClientsPopupService: DeleteClientsPopupService = inject(DeleteClientsPopupService);

    onChooseAllCheckboxClick(isChecked: boolean): void {
        this.#tableDataService.setAllCheckboxClickSubjectObservable(isChecked);
    }

    onAddNewClient(): void {
        this.#clientPopupService.show();
    }

    onClientNameClick(client: TClientTableRow): void {
        this.#clientPopupService.show(client);
    }

    onDeleteClients(): void {
        this.#deleteClientsPopupService.show(this.clients().filter((client: TClientTableRow) => client.isChecked));
    }
}
