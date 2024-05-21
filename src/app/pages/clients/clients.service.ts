import { inject, Injectable, OnDestroy, signal, WritableSignal } from '@angular/core';
import { ApiService } from "../../../api/api.service";
import { Observable, Subscription, take, tap } from "rxjs";
import { TApiClient } from "../../../api/api.types";
import { TBaseTableRow, TClientTableRow } from "./clients.types";
import { HelperFunctions } from "../../../helpers/HelperFunctions";
import { TableDataService } from "../../../ui/table/table-data.service";

@Injectable({
    providedIn: 'any'
})
export class ClientsService implements OnDestroy {
    public clients: WritableSignal<TClientTableRow[]> = signal<TClientTableRow[]>([]);

    #apiService: ApiService = inject(ApiService);
    #tableDataService: TableDataService = inject(TableDataService);
    #subscriptions: Subscription[] = [];

    constructor() {
        let getClientsSubscription: Subscription = this.#apiService.getClients().pipe(
            take(1),
            tap((clients: TApiClient[]) => {
                this.clients.set(this.buildTableRows(clients));
            })
        ).subscribe();
        this.#subscriptions.push(getClientsSubscription);
    }

    private buildTableRows(clients: TApiClient[]): TClientTableRow[] {
        return clients.map((client: TApiClient) => {
            return {
                ...client,
                id: HelperFunctions.randomString(5),
                isChecked: false
            }
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

    ngOnDestroy(): void {
        this.#subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
}
