import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { TableComponent } from "../../../ui/table/table.component";
import { ApiService } from "../../../api/api.service";
import { Subscription } from "rxjs";
import { TBaseTableRow, TClientTableRow } from "./clients.types";
import { TApiClient } from "../../../api/api.types";
import { HelperFunctions } from "../../../helpers/HelperFunctions";
import { TableDataService } from "../../../ui/table/table-data.service";
import { ClientsService } from "./clients.service";

@Component({
  selector: 'initium-clients',
  standalone: true,
    imports: [
        TableComponent
    ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit, OnDestroy {

    protected clientsService: ClientsService = inject(ClientsService);

    #subscriptions: Subscription[] = [];

    ngOnInit(): void {
        this.#subscriptions.push(
            this.clientsService.subscribeToAllCheckboxChange().subscribe(),
            this.clientsService.subscribeToCheckBoxChange().subscribe()
        );
    }

    ngOnDestroy(): void {
        this.#subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
