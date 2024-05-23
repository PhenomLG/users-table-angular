import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ApiService } from "../../../api/api.service";
import { Observable, take, tap } from "rxjs";
import { TApiClient } from "../../../api/api.types";
import { TBaseTableRow, TClientTableRow } from "./clients.types";
import { HelperFunctions } from "../../../helpers/HelperFunctions";
import { TableDataService } from "../../../ui/table/table-data.service";

@Injectable({
    providedIn: 'any'
})
export class ClientsService {
    public clients: WritableSignal<TClientTableRow[]> = signal<TClientTableRow[]>([]);

    #apiService: ApiService = inject(ApiService);
    #tableDataService: TableDataService = inject(TableDataService);

    public loadClients(): Observable<TApiClient[]> {
        return this.#apiService.getClients().pipe(
            take(1),
            tap((clients: TApiClient[]) => {
                this.clients.set(this.buildTableRows(clients));
            })
        );
    }

    public buildTableRows(clients: TApiClient[]): TClientTableRow[] {
        return clients.map((client: TApiClient) => {
            return {
                ...client,
                id: HelperFunctions.randomString(5),
                isChecked: false
            }
        });
    }


    public saveClient(newClientInfo: TClientTableRow): void {
        this.clients.update((clients: TClientTableRow[]) => {
            let copiedClients: TClientTableRow[] = structuredClone(clients);
            let foundClientIndex: number = copiedClients.findIndex((client: TClientTableRow) => client.id === newClientInfo.id);
            if (foundClientIndex !== -1) {
                copiedClients[foundClientIndex] = newClientInfo;
                return copiedClients;
            }
            return [...clients, newClientInfo];
        });
    }

    public deleteClients(clientsToRemove: TClientTableRow[]): void {
        let clientsToRemoveIds: Set<string> = new Set(clientsToRemove.map((client: TClientTableRow) => client.id));
        this.clients.update((clients: TClientTableRow[]) => {
            return clients.filter((client: TClientTableRow) => !clientsToRemoveIds.has(client.id));
        });
    }

    public subscribeToCheckBoxChange(): Observable<TBaseTableRow> {
        return this.#tableDataService.getCheckboxClickObservable().pipe(
            tap((clientRowData: TBaseTableRow) => {
                this.clients.update((clients: TClientTableRow[]) => {
                    let copiedClients: TClientTableRow[] = structuredClone(clients);
                    let foundClient: TClientTableRow | undefined = copiedClients.find((client: TClientTableRow) => client.id === clientRowData.id);
                    if (foundClient) {
                        foundClient.isChecked = clientRowData.isChecked;
                    }
                    return copiedClients;
                });
            })
        )
    }

    public subscribeToAllCheckboxChange(): Observable<boolean> {
        return this.#tableDataService.getAllCheckboxClickObservable().pipe(
            tap((value: boolean) => {
                this.clients.update((clients: TClientTableRow[]) => {
                    let copiedClients: TClientTableRow[] = structuredClone(clients);
                    for (let client of copiedClients) {
                        client.isChecked = value;
                    }
                    return copiedClients;
                })
            })
        );
    }
}
