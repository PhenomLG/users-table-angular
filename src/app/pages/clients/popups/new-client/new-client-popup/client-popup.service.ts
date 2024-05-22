import { Injectable, Injector } from '@angular/core';
import { NgElement, WithProperties } from "@angular/elements";
import { BaseAE } from "../../../../../../helpers/base-ae/base-ae.class";
import { ClientEditPopupComponent } from "./client-edit-popup.component";
import { TClientTableRow } from "../../../clients.types";


@Injectable({
  providedIn: 'root'
})
export class ClientPopupService extends BaseAE {
    private popupEl: (NgElement & WithProperties<ClientEditPopupComponent>) | undefined;

    constructor(private injector: Injector) {
        super('robocode-error-popup-ae', injector, ClientEditPopupComponent);
    }

    override show(client?: TClientTableRow): this {
        if (!!this.popupEl) {
            this.hide();
        }

        this.popupEl = document.createElement(this.componentName) as any;
        this.popupEl?.addEventListener('closeModal', () => {
            this.hide();
        });


        if (this.popupEl instanceof Node) {
            this.popupEl.client = client;
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
