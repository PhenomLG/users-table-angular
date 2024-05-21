import { Component, inject, OnDestroy } from '@angular/core';
import { TableComponent } from "../../../ui/table/table.component";
import { ApiService } from "../../../api/api.service";
import { Observable, Subscription } from "rxjs";
import { TClientTableRow } from "./clients.types";
import { TApiClient } from "../../../api/api.types";
import { HelperFunctions } from "../../../helpers/HelperFunctions";

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
    protected clients: TClientTableRow[] = [];
    #apiService: ApiService = inject(ApiService);
    #subscriptions: Subscription[] = [];

    constructor() {
        let clientsSubscription: Subscription = this.#apiService.getClients().subscribe((clients: TApiClient[]) => {
            this.clients = this.buildTableRows(clients);
        })

        this.#subscriptions.push(clientsSubscription);
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
