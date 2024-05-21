import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { TableComponent } from "../../../ui/table/table.component";
import { ApiService } from "../../../api/api.service";
import { Subscription } from "rxjs";
import { TBaseTableRow, TClientTableRow } from "./clients.types";
import { TApiClient } from "../../../api/api.types";
import { HelperFunctions } from "../../../helpers/HelperFunctions";
import { TableDataService } from "../../../ui/table/table-data.service";

@Component({
  selector: 'initium-clients',
  standalone: true,
    imports: [
        TableComponent
    ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnDestroy {
    protected clients: WritableSignal<TClientTableRow[]> = signal<TClientTableRow[]>([]);
    #apiService: ApiService = inject(ApiService);
    #subscriptions: Subscription[] = [];
    #tableDataService: TableDataService = inject(TableDataService);

    constructor() {
        let clientsSubscription: Subscription = this.#apiService.getClients().subscribe((clients: TApiClient[]) => {
            this.clients.set(this.buildTableRows(clients));
        });

        let tableCheckboxChangeSubscription: Subscription = this.#tableDataService.getCheckboxClickObservable().subscribe((clientRowData: TBaseTableRow) => {
            this.clients.update((clients: TClientTableRow[]) => {
                let copiedClients: TClientTableRow[] = structuredClone(clients);
                let foundClient: TClientTableRow | undefined = copiedClients.find((client: TClientTableRow) => client.id === clientRowData.id);
                if (foundClient) {
                    foundClient.isChecked = clientRowData.isChecked;
                }
                return copiedClients;
            });
        });

        let tableAllCheckboxChangeSubscription: Subscription = this.#tableDataService.getAllCheckboxClickObservable().subscribe((value: boolean) => {
            this.clients.update((clients: TClientTableRow[]) => {
                let copiedClients: TClientTableRow[] = structuredClone(clients);
                for (let client of copiedClients) {
                    client.isChecked = value;
                }
                return copiedClients;
            })
        });

        this.#subscriptions.push(clientsSubscription, tableCheckboxChangeSubscription, tableAllCheckboxChangeSubscription);
    }

    buildTableRows(clients: TApiClient[]): TClientTableRow[] {
        return clients.map((client: TApiClient) => {
            return {
                ...client,
                id: HelperFunctions.randomString(5),
                isChecked: false
            }
        })
    }

    ngOnDestroy(): void {
        this.#subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
}
