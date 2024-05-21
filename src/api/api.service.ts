import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, filter, mergeMap, Observable, of, throwError } from "rxjs";
import { TApiClient, TApiClientsRequest } from "./api.types";
import { TClient } from "../app/pages/clients/clients.types";
import { HelperFunctions } from "../helpers/HelperFunctions";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    #httpClient: HttpClient = inject(HttpClient);
    #domain: string = "test-data.directorix.cloud";

    public getClients(): Observable<TClient[]> {
        return this.#httpClient.get<any>(`https://${this.#domain}/task1`).pipe(
            mergeMap(((data: TApiClientsRequest) => {
                return of(data.users.map((user: TApiClient) => {
                    return {
                        ...user,
                        id: HelperFunctions.randomString(6)
                    }
                }));
            })),
            catchError((err: HttpErrorResponse) => {
                console.error(err);
                return throwError(() => err);
            }),
        )
    }
}
