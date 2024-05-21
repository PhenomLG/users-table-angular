export type TApiClient = {
    name: string,
    secondName: string,
    email: string,
    phone: string
}

export type TApiClientsRequest = {
    users: TApiClient[];
}
