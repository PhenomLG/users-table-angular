import { Injectable } from '@angular/core';
import {  Observable, Subject } from "rxjs";
import { TBaseTableRow } from "../../app/pages/clients/clients.types";

@Injectable(
    { providedIn: 'any' })
export class TableDataService {
    #checkboxClickSubject: Subject<TBaseTableRow> = new Subject<TBaseTableRow>();
    #allCheckboxClickSubject: Subject<boolean> = new Subject<boolean>();

    public getCheckboxClickObservable(): Observable<TBaseTableRow> {
        return this.#checkboxClickSubject.asObservable();
    }

    public setCheckboxClickSubjectObservable(id: string, isChecked: boolean): void {
        this.#checkboxClickSubject.next({ id, isChecked });
    }

    public getAllCheckboxClickObservable(): Observable<boolean> {
        return this.#allCheckboxClickSubject.asObservable();
    }

    public setAllCheckboxClickSubjectObservable(isChecked: boolean): void {
        this.#allCheckboxClickSubject.next(isChecked);
    }
}
