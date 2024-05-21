import { Component, inject, OnDestroy } from '@angular/core';
import { TableComponent } from "../../../ui/table/table.component";
import { ApiService } from "../../../api/api.service";
import { Subscription } from "rxjs";
import { TClient } from "./clients.types";

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
    protected clients: TClient[] = [];
    #apiService: ApiService = inject(ApiService);
    #subscriptions: Subscription[] = [];

    constructor() {
        let clientsSubscription: Subscription = this.#apiService.getClients().subscribe((clients: TClient[]) => {
            this.clients = clients;
        })

        this.#subscriptions.push(clientsSubscription);
    }

    ngOnDestroy(): void {
        this.#subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
}
