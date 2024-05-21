export type TApiClient = {
    name: string,
    surname: string,
    email: string,
    phone: string
}

export type TApiClientsRequest = {
    users: TApiClient[];
}
