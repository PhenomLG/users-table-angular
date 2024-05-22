import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, Input, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { PlusIconComponent } from "../../svg/plus/plus-icon.component";
import { TrashIconComponent } from "../../svg/trash/trash-icon.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { TableRowComponent } from "./table-row/table-row.component";
import { TClientTableRow } from "../../app/pages/clients/clients.types";
import { TableDataService } from "./table-data.service";
import { ClientPopupService } from "../../app/pages/clients/popups/new-client-popup/client-popup.service";
import { DeleteClientsPopupService } from "../../app/pages/clients/popups/delete-clients-popup/delete-clients-popup.service";
import { InputComponent } from "../input/input.component";
import { TApiClient } from "../../api/api.types";

@Component({
    selector: 'initium-table',
    standalone: true,
    imports: [
        PlusIconComponent,
        TrashIconComponent,
        CheckboxComponent,
        TableRowComponent,
        InputComponent,
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
    @ViewChild('input') input: ElementRef | undefined;
    @Input({ alias: 'clients', required: true }) set _clients(clients: TClientTableRow[]) {
        this.clients.set(clients);
        this.filteredClients.set(clients);
    }

    protected clients: WritableSignal<TClientTableRow[]> = signal<TClientTableRow[]>([]);
    protected checkedRows: Signal<TClientTableRow[]> = computed(() => {
        return this.clients().filter((client:TClientTableRow) => client.isChecked);
    });

    protected filter: keyof TApiClient = 'name';
    protected filteredClients: WritableSignal<TClientTableRow[]> = signal<TClientTableRow[]>([]);

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
        this.#deleteClientsPopupService.show(this.checkedRows());
    }

    sortClientsByProperty<T extends keyof TApiClient>(property: T): void {
        this.clients.update((clients: TClientTableRow[]) => {
            return clients.sort((client1: TClientTableRow, client2: TClientTableRow) => {
                return (client1[property] > client2[property]) ? 1 : -1 ;
            });
        });
    }

    onSearchInput($event: Event): void {
        let input: HTMLInputElement | undefined = $event.target as HTMLInputElement;
        this.filteredClients.set(this.clients().filter((client: TClientTableRow) => client[this.filter].toLowerCase().includes(input?.value.toLowerCase() ?? "")));
    }
}
