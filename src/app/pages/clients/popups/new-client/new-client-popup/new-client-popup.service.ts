import { Injectable, Injector } from '@angular/core';
import { NgElement, WithProperties } from "@angular/elements";
import { BaseAE } from "../../../../../../helpers/base-ae/base-ae.class";
import { NewClientPopupComponent } from "./new-client-popup.component";


@Injectable({
  providedIn: 'root'
})
export class NewClientPopupService extends BaseAE {
    private popupEl: (NgElement & WithProperties<NewClientPopupComponent>) | undefined;

    constructor(private injector: Injector) {
        super('robocode-error-popup-ae', injector, NewClientPopupComponent);
    }

    override show(): this {
        if (!!this.popupEl) {
            this.hide();
        }

        this.popupEl = document.createElement(this.componentName) as any;
        this.popupEl?.addEventListener('closeModal', () => {
            this.hide();
        });

        if (this.popupEl instanceof Node) {
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
