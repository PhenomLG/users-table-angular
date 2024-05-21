import { FormControl } from "@angular/forms";

export type TNewClientForm = {
    name: FormControl<string>,
    surname: FormControl<string>,
    email: FormControl<string>,
    phone: FormControl<string>,
}
