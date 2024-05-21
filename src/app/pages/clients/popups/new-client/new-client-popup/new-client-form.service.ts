import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TNewClientForm } from "./new-client-form-types";
import { Patterns } from "../../../../../../helpers/Patterns";

@Injectable({
  providedIn: 'any'
})
export class NewClientFormService {
    #fb: FormBuilder = inject(FormBuilder);
    #form!: FormGroup<TNewClientForm>;

    constructor() {
        this.setForm();
    }

    private setForm(): void {
        this.#form = this.#fb.nonNullable.group({
            name: ["", [Validators.required, Validators.pattern(Patterns.OnlyTextPattern())]],
            surname: ["", [Validators.required, Validators.pattern(Patterns.OnlyTextPattern())]],
            email: ["", [Validators.required, Validators.email]],
            phone: ["", [Validators.required, Validators.pattern(Patterns.PhonePattern())]],
        });
    }

    public getForm(): FormGroup<TNewClientForm> {
        return this.#form;
    }
}
