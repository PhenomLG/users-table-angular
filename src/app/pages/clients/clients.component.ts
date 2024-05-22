import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TableComponent } from "../../../ui/table/table.component";
import { Subscription, tap } from "rxjs";
import { ClientsService } from "./clients.service";

@Component({
    selector: 'initium-clients',
    standalone: true,
    imports: [
        TableComponent
    ],
    templateUrl: './clients.component.html',
    styleUrl: './clients.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent implements OnInit, OnDestroy {
    protected clientsService: ClientsService = inject(ClientsService);
    #subscriptions: Subscription[] = [];

    ngOnInit(): void {
        this.clientsService.loadClients().subscribe(() => {
            this.#subscriptions.push(
                this.clientsService.subscribeToAllCheckboxChange().subscribe(),
                this.clientsService.subscribeToCheckBoxChange().subscribe()
            );
        });
    }

    ngOnDestroy(): void {
        this.#subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
}
