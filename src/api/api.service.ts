import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, mergeMap, Observable, of, throwError } from "rxjs";
import { TApiClient, TApiClientsRequest } from "./api.types";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    #httpClient: HttpClient = inject(HttpClient);
    #domain: string = "test-data.directorix.cloud";

    public getClients(): Observable<TApiClient[]> {
        return this.#httpClient.get<any>(`https://${this.#domain}/task1`).pipe(
            mergeMap((data: TApiClientsRequest) => {
                return of(data.users);
            }),
            catchError((err: HttpErrorResponse) => {
                console.error(err);
                return throwError(() => err);
            }),
        )
    }
}
