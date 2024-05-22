import { Injectable, Injector } from '@angular/core';
import { BaseAE } from "../../../../../helpers/base-ae/base-ae.class";
import { NgElement, WithProperties } from "@angular/elements";
import { DeleteClientsPopupComponent } from "./delete-clients-popup.component";
import { TClientTableRow } from "../../clients.types";

@Injectable({
    providedIn: 'any'
})
export class DeleteClientsPopupService extends BaseAE {
    private popupEl: (NgElement & WithProperties<DeleteClientsPopupComponent>) | undefined;

    constructor(private injector: Injector) {
        super('initium-delete-clients-popup-ae', injector, DeleteClientsPopupComponent);
    }

    override show(clients: TClientTableRow[]): this {
        if (!!this.popupEl) {
            this.hide();
        }

        this.popupEl = document.createElement(this.componentName) as any;
        this.popupEl?.addEventListener('closeModal', () => {
            this.hide();
        });

        if (this.popupEl instanceof Node) {
            this.popupEl.clients = clients;
            this.getParent().appendChild(this.popupEl);
        }

        return this;
    }
    override hide(): this {
        if (!this.popupEl) {
            return this;
        }
        this.getParent().removeChild(this.popupEl);
        this.popupEl = undefined;
        return this;
    }
}
