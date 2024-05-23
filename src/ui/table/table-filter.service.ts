import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { TClientTableRow } from "../../app/pages/clients/clients.types";
import { TApiClient } from "../../api/api.types";
import { TSelectOption } from "../dropdown/dropdown.component";
import { FormBuilder, FormControl } from "@angular/forms";

@Injectable({
    providedIn: 'any'
})
export class TableFilterService {
    #fb: FormBuilder = inject(FormBuilder);

    public filterSubject: BehaviorSubject<TClientTableRow[]> = new BehaviorSubject<TClientTableRow[]>([]);
    public filterKeyControl: FormControl<keyof TApiClient> = this.#fb.nonNullable.control('name');
    public searchCache: string = "";

    public getFilterOptions(): TSelectOption[] {
        return [
            { value: 'name', label: 'Имя' },
            { value: 'surname', label: 'Фамилия' },
            { value: 'email', label: 'E-mail' },
            { value: 'phone', label: 'Телефон' },
        ];
    }

    public setFilter(clients: TClientTableRow[]): void {
        this.filterSubject.next(clients);
    }

    public handleSearchInput(clients: TClientTableRow[], value: string): void {
        this.searchCache = value;
        this.filterSubject.next(clients.filter((client: TClientTableRow) => client?.[this.filterKeyControl.value].toLowerCase().includes(value.toLowerCase() ?? "")));
    }
}
