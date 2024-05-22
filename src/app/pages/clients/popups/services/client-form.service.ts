import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TNewClientForm } from "../new-client-popup/client-form-types";
import { Patterns } from "../../../../../helpers/Patterns";
import { ClientsService } from "../../clients.service";
import { TClientTableRow } from "../../clients.types";
import { HelperFunctions } from "../../../../../helpers/HelperFunctions";

@Injectable({
  providedIn: 'any'
})
export class ClientFormService {
    #fb: FormBuilder = inject(FormBuilder);
    #form!: FormGroup<TNewClientForm>;
    #clientsService: ClientsService = inject(ClientsService);

    public setForm(client?: TClientTableRow): void {
        this.#form = this.#fb.nonNullable.group({
            id: [client?.id ?? HelperFunctions.randomString(5), Validators.required],
            isChecked: [client?.isChecked ?? false, Validators.required],
            name: [client?.name ?? "", [Validators.required, Validators.minLength(2), Validators.pattern(Patterns.OnlyTextPattern())]],
            surname: [client?.surname ?? "", [Validators.required, Validators.minLength(2), Validators.pattern(Patterns.OnlyTextPattern())]],
            email: [client?.email ?? "", [Validators.required, Validators.email]],
            phone: [client?.phone ?? "", [Validators.required, Validators.pattern(Patterns.PhonePattern())]],
        });
    }

    public getForm(): FormGroup<TNewClientForm> {
        return this.#form;
    }

    public isFormInvalid(): boolean {
        return this.#form.invalid || this.#form.pristine;
    }

    public saveClient(): void {
        this.#clientsService.saveClient(this.#form.getRawValue());
    }
}
