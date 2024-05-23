import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TableComponent } from "../../../ui/table/table.component";
import { Subscription } from "rxjs";
import { ClientsService } from "./clients.service";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'initium-clients',
    standalone: true,
    imports: [
        TableComponent,
        AsyncPipe
    ],
    templateUrl: './clients.component.html',
    styleUrl: './clients.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent implements OnInit, OnDestroy {
    protected clientsService: ClientsService = inject(ClientsService);
    #subscriptions: Subscription[] = [];

    ngOnInit(): void {
        this.#subscriptions.push(
            this.clientsService.loadClients().subscribe(),
            this.clientsService.subscribeToAllCheckboxChange().subscribe(),
            this.clientsService.subscribeToCheckBoxChange().subscribe()
        );
    }

    ngOnDestroy(): void {
        this.#subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
}
