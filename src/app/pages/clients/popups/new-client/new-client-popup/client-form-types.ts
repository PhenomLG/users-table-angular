import { FormControl } from "@angular/forms";

export type TNewClientForm = {
    id: FormControl<string>,
    isChecked: FormControl<boolean>,
    name: FormControl<string>,
    surname: FormControl<string>,
    email: FormControl<string>,
    phone: FormControl<string>,
}
